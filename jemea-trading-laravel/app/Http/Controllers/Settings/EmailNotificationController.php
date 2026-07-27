<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateEmailNotificationSettingsRequest;
use App\Models\EmailNotificationSetting;
use App\Services\EmailNotificationSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class EmailNotificationController extends Controller
{
    public function edit(EmailNotificationSettings $settings): Response
    {
        Gate::authorize('access-admin');

        return Inertia::render('settings/email-notifications', [
            'settings' => $settings->formValues(),
        ]);
    }

    public function update(
        UpdateEmailNotificationSettingsRequest $request,
        EmailNotificationSettings $settings,
    ): RedirectResponse {
        $validated = $request->validated();
        $existing = $settings->stored();
        $setting = $existing ?? new EmailNotificationSetting;

        if ($existing === null) {
            $setting->forceFill(['id' => EmailNotificationSetting::SINGLETON_ID]);
        }

        $setting->fill([
            'notifications_enabled' => $validated['notifications_enabled'],
            'smtp_host' => $validated['smtp_host'],
            'smtp_port' => $validated['smtp_port'],
            'smtp_username' => $validated['smtp_username'],
            'smtp_encryption' => $validated['smtp_encryption'],
            'from_address' => $validated['from_address'],
            'from_name' => $validated['from_name'],
            'notification_email' => $validated['notification_email'],
        ]);

        if ($validated['clear_password']) {
            $setting->smtp_password = null;
        } elseif (filled($validated['smtp_password'])) {
            $setting->smtp_password = $validated['smtp_password'];
        } elseif ($existing === null && filled(config('mail.mailers.smtp.password'))) {
            $setting->smtp_password = config('mail.mailers.smtp.password');
        }

        $setting->save();

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Email notification settings saved.',
        ]);
    }

    public function test(EmailNotificationSettings $settings): RedirectResponse
    {
        Gate::authorize('access-admin');

        try {
            $mail = $settings->applyMailerConfiguration();

            Mail::mailer($mail['mailer'])->raw(
                'Your Jemea Trading PLC inquiry notification email settings are working correctly.',
                function (Message $message) use ($mail): void {
                    $message
                        ->to($mail['destination'])
                        ->subject('Jemea Trading PLC email settings test');
                },
            );
        } catch (Throwable $exception) {
            Log::error('Email notification settings test failed.', [
                'user_id' => request()->user()?->getKey(),
                'exception' => $exception,
            ]);

            return back()->withErrors([
                'test_email' => 'The test email could not be sent. Verify the SMTP values and review the application log.',
            ]);
        }

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Test email sent successfully.',
        ]);
    }
}
