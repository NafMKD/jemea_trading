<?php

use App\Http\Controllers\Admin\ContactInquiryController as AdminContactInquiryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ContactInquiryController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', function () {
    return response()
        ->view('seo.sitemap', ['pages' => config('seo.pages')])
        ->header('Content-Type', 'application/xml; charset=UTF-8')
        ->header('Cache-Control', 'public, max-age=3600');
})->name('seo.sitemap');

Route::get('/robots.txt', function () {
    $contents = implode("\n", [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin',
        'Disallow: /settings',
        'Disallow: /login',
        'Sitemap: '.route('seo.sitemap'),
        '',
    ]);

    return response($contents, 200, [
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Cache-Control' => 'public, max-age=3600',
    ]);
})->name('seo.robots');

Route::inertia('/', 'public/home')->name('home');
Route::inertia('/about', 'public/about')->name('about');
Route::inertia('/products', 'public/products')->name('products.index');
Route::get('/contact', [ContactInquiryController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactInquiryController::class, 'store'])
    ->middleware('throttle:contact-submissions')
    ->name('contact.store');

Route::middleware(['auth', 'active', 'verified', 'can:access-admin'])->group(function () {
    Route::get('admin', DashboardController::class)->name('dashboard');
    Route::get('admin/inquiries', [AdminContactInquiryController::class, 'index'])
        ->name('admin.inquiries.index');
    Route::get('admin/inquiries/{inquiry}', [AdminContactInquiryController::class, 'show'])
        ->name('admin.inquiries.show');
    Route::patch('admin/inquiries/{inquiry}', [AdminContactInquiryController::class, 'update'])
        ->name('admin.inquiries.update');
    Route::delete('admin/inquiries/{inquiry}', [AdminContactInquiryController::class, 'destroy'])
        ->name('admin.inquiries.destroy');
});

require __DIR__.'/settings.php';
