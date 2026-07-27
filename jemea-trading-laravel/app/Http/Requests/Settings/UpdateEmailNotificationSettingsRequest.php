<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmailNotificationSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('access-admin') ?? false;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'smtp_host' => trim((string) $this->input('smtp_host')),
            'smtp_username' => $this->filled('smtp_username')
                ? trim((string) $this->input('smtp_username'))
                : null,
            'from_address' => mb_strtolower(trim((string) $this->input('from_address'))),
            'from_name' => trim((string) $this->input('from_name')),
            'notification_email' => mb_strtolower(trim((string) $this->input('notification_email'))),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'notifications_enabled' => ['required', 'boolean'],
            'smtp_host' => ['required', 'string', 'max:255'],
            'smtp_port' => ['required', 'integer', 'between:1,65535'],
            'smtp_username' => ['nullable', 'string', 'max:255'],
            'smtp_password' => ['nullable', 'string', 'max:1024'],
            'clear_password' => ['required', 'boolean'],
            'smtp_encryption' => ['required', Rule::in(['none', 'tls', 'ssl'])],
            'from_address' => ['required', 'email:rfc', 'max:255'],
            'from_name' => ['required', 'string', 'max:255'],
            'notification_email' => ['required', 'email:rfc', 'max:255'],
        ];
    }
}
