<?php

namespace App\Jobs;

use App\Mail\ContactInquiryReceived;
use App\Models\ContactInquiry;
use App\Services\EmailNotificationSettings;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendContactInquiryNotification implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public function __construct(public ContactInquiry $inquiry) {}

    public function handle(?EmailNotificationSettings $settings = null): void
    {
        try {
            $settings ??= app(EmailNotificationSettings::class);

            if (! $settings->notificationsEnabled()) {
                return;
            }

            $mail = $settings->applyMailerConfiguration();

            Mail::mailer($mail['mailer'])
                ->to($mail['destination'])
                ->send(new ContactInquiryReceived($this->inquiry));

            $this->inquiry->forceFill(['email_sent_at' => now()])->save();
        } catch (Throwable $exception) {
            Log::error('Contact inquiry notification failed.', [
                'inquiry_id' => $this->inquiry->getKey(),
                'exception' => $exception,
            ]);

            throw $exception;
        }
    }
}
