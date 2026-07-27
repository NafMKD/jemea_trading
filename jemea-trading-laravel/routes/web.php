<?php

use App\Http\Controllers\ContactInquiryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/home')->name('home');
Route::inertia('/about', 'public/about')->name('about');
Route::inertia('/products', 'public/products')->name('products.index');
Route::inertia('/contact', 'public/contact')->name('contact.create');
Route::post('/contact', [ContactInquiryController::class, 'store'])
    ->middleware('throttle:contact-submissions')
    ->name('contact.store');

Route::middleware(['auth', 'active', 'verified', 'can:access-admin'])->group(function () {
    Route::inertia('admin', 'admin/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
