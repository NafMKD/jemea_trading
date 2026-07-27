<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'notifications_enabled',
    'smtp_host',
    'smtp_port',
    'smtp_username',
    'smtp_password',
    'smtp_encryption',
    'from_address',
    'from_name',
    'notification_email',
])]
class EmailNotificationSetting extends Model
{
    public const SINGLETON_ID = 1;

    protected function casts(): array
    {
        return [
            'notifications_enabled' => 'boolean',
            'smtp_port' => 'integer',
            'smtp_password' => 'encrypted',
        ];
    }
}
