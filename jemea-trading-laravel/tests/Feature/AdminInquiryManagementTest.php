<?php

namespace Tests\Feature;

use App\Enums\InquiryStatus;
use App\Models\ContactInquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminInquiryManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->admin()->create();
    }

    public function test_dashboard_reports_inquiry_statistics_and_recent_activity(): void
    {
        ContactInquiry::factory()->create([
            'status' => InquiryStatus::New,
            'created_at' => now()->subDays(2),
        ]);
        ContactInquiry::factory()->create([
            'status' => InquiryStatus::Read,
            'created_at' => now()->subDays(10),
        ]);
        ContactInquiry::factory()->create([
            'status' => InquiryStatus::Archived,
            'created_at' => now()->subDays(45),
        ]);

        $this->actingAs($this->admin)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/dashboard')
                ->where('stats.total', 3)
                ->where('stats.new', 1)
                ->where('stats.last_7_days', 1)
                ->where('stats.last_30_days', 2)
                ->has('recentInquiries', 3));
    }

    public function test_inquiry_index_is_paginated_and_sorted_newest_first(): void
    {
        ContactInquiry::factory()->count(16)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.inquiries.index'));

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/inquiries/index')
                ->has('inquiries.data', 15)
                ->where('inquiries.total', 16)
                ->where('inquiries.current_page', 1)
                ->where('filters.sort', 'newest'));

        $dates = collect($response->viewData('page')['props']['inquiries']['data'])
            ->pluck('created_at');

        $this->assertSame($dates->sortDesc()->values()->all(), $dates->values()->all());
    }

    public function test_inquiries_can_be_searched_and_filtered(): void
    {
        $matching = ContactInquiry::factory()->create([
            'name' => 'Abebe Export Lead',
            'company' => 'Highland Cooperative',
            'product_interest' => 'coffee',
            'status' => InquiryStatus::New,
            'created_at' => now()->subDay(),
        ]);
        ContactInquiry::factory()->create([
            'name' => 'Other Request',
            'product_interest' => 'sesame',
            'status' => InquiryStatus::Read,
            'created_at' => now()->subMonth(),
        ]);

        $this->actingAs($this->admin)
            ->get(route('admin.inquiries.index', [
                'search' => 'Highland',
                'status' => InquiryStatus::New->value,
                'product_interest' => 'coffee',
                'date_from' => now()->subWeek()->toDateString(),
                'date_to' => now()->toDateString(),
                'sort' => 'oldest',
            ]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('inquiries.data', 1)
                ->where('inquiries.data.0.id', $matching->id)
                ->where('filters.search', 'Highland')
                ->where('filters.status', 'new')
                ->where('filters.product_interest', 'coffee')
                ->where('filters.sort', 'oldest'));
    }

    public function test_filter_validation_rejects_invalid_ranges_and_statuses(): void
    {
        $this->actingAs($this->admin)
            ->from(route('admin.inquiries.index'))
            ->get(route('admin.inquiries.index', [
                'status' => 'unknown',
                'date_from' => '2026-07-20',
                'date_to' => '2026-07-10',
            ]))
            ->assertRedirect(route('admin.inquiries.index'))
            ->assertSessionHasErrors(['status', 'date_to']);
    }

    public function test_administrator_can_view_an_inquiry(): void
    {
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($this->admin)
            ->get(route('admin.inquiries.show', $inquiry))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/inquiries/show')
                ->where('inquiry.id', $inquiry->id)
                ->where('inquiry.message', $inquiry->message)
                ->has('statuses', 4)
                ->has('assignees'));
    }

    public function test_administrator_can_update_status_and_assignment(): void
    {
        $assignee = User::factory()->create();
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($this->admin)
            ->patch(route('admin.inquiries.update', $inquiry), [
                'status' => InquiryStatus::Replied->value,
                'assigned_to' => $assignee->id,
            ])
            ->assertRedirect()
            ->assertSessionHas('toast.type', 'success');

        $inquiry->refresh();

        $this->assertSame(InquiryStatus::Replied, $inquiry->status);
        $this->assertSame($assignee->id, $inquiry->assigned_to);
        $this->assertNotNull($inquiry->replied_at);
    }

    public function test_marking_an_inquiry_read_records_the_timestamp_once(): void
    {
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($this->admin)
            ->patch(route('admin.inquiries.update', $inquiry), [
                'status' => InquiryStatus::Read->value,
                'assigned_to' => null,
            ])
            ->assertRedirect();

        $firstReadAt = $inquiry->refresh()->read_at;

        $this->travel(5)->minutes();

        $this->actingAs($this->admin)
            ->patch(route('admin.inquiries.update', $inquiry), [
                'status' => InquiryStatus::Read->value,
                'assigned_to' => null,
            ])
            ->assertRedirect();

        $this->assertTrue($firstReadAt?->equalTo($inquiry->refresh()->read_at));
    }

    public function test_inquiry_can_be_archived(): void
    {
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($this->admin)
            ->patch(route('admin.inquiries.update', $inquiry), [
                'status' => InquiryStatus::Archived->value,
                'assigned_to' => null,
            ])
            ->assertRedirect();

        $this->assertSame(InquiryStatus::Archived, $inquiry->refresh()->status);
    }

    public function test_assignment_must_reference_an_active_user(): void
    {
        $inactiveUser = User::factory()->inactive()->create();
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($this->admin)
            ->patch(route('admin.inquiries.update', $inquiry), [
                'status' => InquiryStatus::Read->value,
                'assigned_to' => $inactiveUser->id,
            ])
            ->assertSessionHasErrors('assigned_to');

        $this->assertNull($inquiry->refresh()->assigned_to);
    }

    public function test_administrator_can_delete_an_inquiry(): void
    {
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($this->admin)
            ->delete(route('admin.inquiries.destroy', $inquiry))
            ->assertRedirect(route('admin.inquiries.index'))
            ->assertSessionHas('toast.type', 'success');

        $this->assertModelMissing($inquiry);
    }

    public function test_guests_cannot_access_or_mutate_inquiries(): void
    {
        $inquiry = ContactInquiry::factory()->create();

        $this->get(route('admin.inquiries.index'))->assertRedirect(route('login'));
        $this->get(route('admin.inquiries.show', $inquiry))->assertRedirect(route('login'));
        $this->patch(route('admin.inquiries.update', $inquiry), [
            'status' => InquiryStatus::Read->value,
            'assigned_to' => null,
        ])->assertRedirect(route('login'));
        $this->delete(route('admin.inquiries.destroy', $inquiry))->assertRedirect(route('login'));

        $this->assertModelExists($inquiry);
    }

    public function test_staff_cannot_access_or_mutate_inquiries(): void
    {
        $staff = User::factory()->create();
        $inquiry = ContactInquiry::factory()->create();

        $this->actingAs($staff)
            ->get(route('admin.inquiries.index'))
            ->assertForbidden();
        $this->actingAs($staff)
            ->get(route('admin.inquiries.show', $inquiry))
            ->assertForbidden();
        $this->actingAs($staff)
            ->patch(route('admin.inquiries.update', $inquiry), [
                'status' => InquiryStatus::Read->value,
                'assigned_to' => null,
            ])
            ->assertForbidden();
        $this->actingAs($staff)
            ->delete(route('admin.inquiries.destroy', $inquiry))
            ->assertForbidden();

        $this->assertModelExists($inquiry);
    }
}
