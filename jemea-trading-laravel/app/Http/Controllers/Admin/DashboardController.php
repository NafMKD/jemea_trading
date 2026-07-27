<?php

namespace App\Http\Controllers\Admin;

use App\Enums\InquiryStatus;
use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        Gate::authorize('viewAny', ContactInquiry::class);

        $stats = [
            'total' => ContactInquiry::query()->count(),
            'new' => ContactInquiry::query()->where('status', InquiryStatus::New)->count(),
            'last_7_days' => ContactInquiry::query()->where('created_at', '>=', now()->subDays(7))->count(),
            'last_30_days' => ContactInquiry::query()->where('created_at', '>=', now()->subDays(30))->count(),
        ];

        $recentInquiries = ContactInquiry::query()
            ->with('assignee:id,name')
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (ContactInquiry $inquiry): array => $this->summary($inquiry));

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentInquiries' => $recentInquiries,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function summary(ContactInquiry $inquiry): array
    {
        return [
            'id' => $inquiry->id,
            'name' => $inquiry->name,
            'email' => $inquiry->email,
            'company' => $inquiry->company,
            'product_interest' => $inquiry->product_interest,
            'status' => $inquiry->status->value,
            'created_at' => $inquiry->created_at?->toIso8601String(),
            'assignee' => $inquiry->assignee?->only(['id', 'name']),
        ];
    }
}
