<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'active', 'verified', 'can:access-admin'])->group(function () {
    Route::inertia('admin', 'admin/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
