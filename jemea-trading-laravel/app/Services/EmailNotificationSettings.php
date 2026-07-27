<?php

namespace App\Services;

use App\Models\EmailNotificationSetting;
use Illuminate\Support\Facades\Mail;

class EmailNotificationSettings
{
    public function stored(): ?EmailNotificationSetting
    {
        return EmailNotificationSetting::query()
            ->first();
    }

    public function notificationsEnabled(): bool
    {
        return $this->stored()?->notifications_enabled
            ?? (bool) config('mail.notifications_enabled', true);
    }

    /**
     * Apply the current settings and return the mailer and destination.
     *
     * @return array{mailer: string, destination: string}
     */
    public function applyMailerConfiguration(): array
    {
        $setting = $this->stored();

        if ($setting === null) {
            return [
                'mailer' => (string) config('mail.default'),
                'destination' => (string) config('mail.contact_to'),
            ];
        }

        config([
            'mail.default' => 'smtp',
            'mail.mailers.smtp.host' => $setting->smtp_host,
            'mail.mailers.smtp.port' => $setting->smtp_port,
            'mail.mailers.smtp.username' => $setting->smtp_username,
            'mail.mailers.smtp.password' => $setting->smtp_password,
            'mail.mailers.smtp.scheme' => $setting->smtp_encryption === 'ssl' ? 'smtps' : null,
            'mail.mailers.smtp.auto_tls' => $setting->smtp_encryption !== 'none',
            'mail.from.address' => $setting->from_address,
            'mail.from.name' => $setting->from_name,
            'mail.contact_to' => $setting->notification_email,
        ]);

        Mail::purge('smtp');

        return [
            'mailer' => 'smtp',
            'destination' => $setting->notification_email,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function formValues(): array
    {
        $setting = $this->stored();

        return [
            'notifications_enabled' => $setting?->notifications_enabled
                ?? (bool) config('mail.notifications_enabled', true),
            'smtp_host' => $setting?->smtp_host
                ?? (string) config('mail.mailers.smtp.host'),
            'smtp_port' => $setting?->smtp_port
                ?? (int) config('mail.mailers.smtp.port', 587),
            'smtp_username' => $setting?->smtp_username
                ?? config('mail.mailers.smtp.username'),
            'smtp_encryption' => $setting?->smtp_encryption
                ?? $this->environmentEncryption(),
            'from_address' => $setting?->from_address
                ?? (string) config('mail.from.address'),
            'from_name' => $setting?->from_name
                ?? (string) config('mail.from.name'),
            'notification_email' => $setting?->notification_email
                ?? (string) config('mail.contact_to'),
            'has_password' => $setting !== null
                ? filled($setting->smtp_password)
                : filled(config('mail.mailers.smtp.password')),
            'is_persisted' => $setting !== null,
        ];
    }

    private function environmentEncryption(): string
    {
        return config('mail.mailers.smtp.scheme') === 'smtps' ? 'ssl' : 'tls';
    }
}
