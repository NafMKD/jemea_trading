<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Jobs\SendContactInquiryNotification;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('website');
        $inquiry = ContactInquiry::query()->create($data);

        SendContactInquiryNotification::dispatch($inquiry);

        return to_route('contact.create')->with(
            'contact_success',
            'Message sent successfully! We will get back to you shortly.',
        );
    }
}
