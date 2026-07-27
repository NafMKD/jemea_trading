<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Jobs\SendContactInquiryNotification;
use App\Models\ContactInquiry;
use App\Services\EmailNotificationSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactInquiryController extends Controller
{
    private const PRODUCT_INTERESTS = [
        'coffee',
        'sesame',
        'niger',
        'mung',
        'soya',
        'peanuts',
        'castor',
        'pigeon-pea',
        'polymer',
        'vehicles',
        'other',
    ];

    public function create(Request $request): Response
    {
        $product = $request->string('product')->toString();

        return Inertia::render('public/contact', [
            'productInterest' => in_array($product, self::PRODUCT_INTERESTS, true)
                ? $product
                : null,
        ]);
    }

    public function store(
        StoreContactInquiryRequest $request,
        EmailNotificationSettings $settings,
    ): RedirectResponse {
        $data = $request->safe()->except('website');
        $inquiry = ContactInquiry::query()->create($data);

        if ($settings->notificationsEnabled()) {
            SendContactInquiryNotification::dispatch($inquiry);
        }

        return to_route('contact.create')->with(
            'contact_success',
            'Message sent successfully! We will get back to you shortly.',
        );
    }
}
