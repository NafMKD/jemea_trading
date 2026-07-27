<?php

use App\Http\Controllers\Settings\EmailNotificationController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'active'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'active', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');
});

Route::middleware(['auth', 'active', 'verified', 'can:access-admin'])->group(function () {
    Route::get('settings/email-notifications', [EmailNotificationController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('email-notifications.edit');
    Route::patch('settings/email-notifications', [EmailNotificationController::class, 'update'])
        ->middleware(RequirePassword::class)
        ->name('email-notifications.update');
    Route::post('settings/email-notifications/test', [EmailNotificationController::class, 'test'])
        ->middleware([RequirePassword::class, 'throttle:3,1'])
        ->name('email-notifications.test');
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
