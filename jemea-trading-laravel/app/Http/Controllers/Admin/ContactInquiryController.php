<?php

namespace App\Http\Controllers\Admin;

use App\Enums\InquiryStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\IndexContactInquiryRequest;
use App\Http\Requests\Admin\UpdateContactInquiryRequest;
use App\Models\ContactInquiry;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ContactInquiryController extends Controller
{
    public function index(IndexContactInquiryRequest $request): Response
    {
        $filters = $request->validated();
        $direction = $filters['sort'] === 'oldest' ? 'asc' : 'desc';

        $inquiries = ContactInquiry::query()
            ->with('assignee:id,name')
            ->filter($filters)
            ->orderBy('created_at', $direction)
            ->paginate(15)
            ->withQueryString()
            ->through(fn (ContactInquiry $inquiry): array => $this->summary($inquiry));

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $inquiries,
            'filters' => $filters,
            'statuses' => $this->statusOptions(),
            'productInterests' => ContactInquiry::query()
                ->whereNotNull('product_interest')
                ->where('product_interest', '!=', '')
                ->distinct()
                ->orderBy('product_interest')
                ->pluck('product_interest'),
        ]);
    }

    public function show(ContactInquiry $inquiry): Response
    {
        Gate::authorize('view', $inquiry);

        $inquiry->load('assignee:id,name,email');

        return Inertia::render('admin/inquiries/show', [
            'inquiry' => [
                ...$this->summary($inquiry),
                'message' => $inquiry->message,
                'source' => $inquiry->source,
                'email_sent_at' => $inquiry->email_sent_at?->toIso8601String(),
                'read_at' => $inquiry->read_at?->toIso8601String(),
                'replied_at' => $inquiry->replied_at?->toIso8601String(),
                'updated_at' => $inquiry->updated_at?->toIso8601String(),
                'assignee' => $inquiry->assignee?->only(['id', 'name', 'email']),
            ],
            'statuses' => $this->statusOptions(),
            'assignees' => User::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
        ]);
    }

    public function update(UpdateContactInquiryRequest $request, ContactInquiry $inquiry): RedirectResponse
    {
        $validated = $request->validated();
        $status = InquiryStatus::from($validated['status']);

        $inquiry->fill([
            'status' => $status,
            'assigned_to' => $validated['assigned_to'],
        ]);

        if ($status === InquiryStatus::Read && $inquiry->read_at === null) {
            $inquiry->read_at = now();
        }

        if ($status === InquiryStatus::Replied && $inquiry->replied_at === null) {
            $inquiry->replied_at = now();
        }

        $inquiry->save();

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Inquiry updated.',
        ]);
    }

    public function destroy(ContactInquiry $inquiry): RedirectResponse
    {
        Gate::authorize('delete', $inquiry);

        $inquiry->delete();

        return to_route('admin.inquiries.index')->with('toast', [
            'type' => 'success',
            'message' => 'Inquiry permanently deleted.',
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

    /**
     * @return list<array{value: string, label: string}>
     */
    private function statusOptions(): array
    {
        return array_map(
            fn (InquiryStatus $status): array => [
                'value' => $status->value,
                'label' => $status->label(),
            ],
            InquiryStatus::cases(),
        );
    }
}
