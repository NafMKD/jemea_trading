<?php

namespace Tests\Feature;

use App\Enums\InquiryStatus;
use App\Jobs\SendContactInquiryNotification;
use App\Mail\ContactInquiryReceived;
use App\Models\ContactInquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\RateLimiter;
use RuntimeException;
use Tests\TestCase;

class ContactInquiryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        RateLimiter::clear('127.0.0.1');
    }

    public function test_valid_contact_submission_is_stored_and_notification_is_queued(): void
    {
        Queue::fake();

        $response = $this->post(route('contact.store'), $this->validPayload());

        $response
            ->assertRedirect('/contact')
            ->assertSessionHas('contact_success');

        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Aster Bekele',
            'email' => 'aster@example.com',
            'company' => 'Aster Imports',
            'product_interest' => 'coffee',
            'status' => InquiryStatus::New->value,
            'source' => 'website',
        ]);

        Queue::assertPushed(
            SendContactInquiryNotification::class,
            fn (SendContactInquiryNotification $job): bool => $job->inquiry->email === 'aster@example.com',
        );
    }

    public function test_contact_submission_validation_errors_do_not_create_an_inquiry(): void
    {
        Queue::fake();

        $this->post(route('contact.store'), [
            'name' => '',
            'email' => 'not-an-email',
            'message' => 'short',
            'website' => '',
        ])->assertSessionHasErrors(['name', 'email', 'message']);

        $this->assertDatabaseCount('contact_inquiries', 0);
        Queue::assertNothingPushed();
    }

    public function test_honeypot_rejects_bot_submissions(): void
    {
        Queue::fake();

        $this->post(route('contact.store'), [
            ...$this->validPayload(),
            'website' => 'https://spam.example',
        ])->assertSessionHasErrors('website');

        $this->assertDatabaseCount('contact_inquiries', 0);
        Queue::assertNothingPushed();
    }

    public function test_contact_submissions_are_rate_limited(): void
    {
        Queue::fake();

        foreach (range(1, 5) as $attempt) {
            $this->post(route('contact.store'), [
                ...$this->validPayload(),
                'email' => "contact{$attempt}@example.com",
            ])->assertRedirect('/contact');
        }

        $this->post(route('contact.store'), $this->validPayload())
            ->assertTooManyRequests();
    }

    public function test_notification_job_marks_the_inquiry_as_emailed(): void
    {
        Mail::fake();
        $inquiry = ContactInquiry::factory()->create();

        (new SendContactInquiryNotification($inquiry))->handle();

        Mail::assertSent(
            ContactInquiryReceived::class,
            fn (ContactInquiryReceived $mail): bool => $mail->inquiry->is($inquiry),
        );
        $this->assertNotNull($inquiry->fresh()->email_sent_at);
    }

    public function test_mail_failure_does_not_remove_the_stored_inquiry(): void
    {
        $inquiry = ContactInquiry::factory()->create();

        Mail::shouldReceive('mailer')
            ->once()
            ->andReturnSelf();
        Mail::shouldReceive('to')
            ->once()
            ->andThrow(new RuntimeException('SMTP unavailable'));

        try {
            (new SendContactInquiryNotification($inquiry))->handle();
            $this->fail('The notification job should rethrow mail failures.');
        } catch (RuntimeException $exception) {
            $this->assertSame('SMTP unavailable', $exception->getMessage());
        }

        $this->assertDatabaseHas('contact_inquiries', ['id' => $inquiry->id]);
        $this->assertNull($inquiry->fresh()->email_sent_at);
    }

    public function test_mail_template_escapes_visitor_content(): void
    {
        $inquiry = ContactInquiry::factory()->make([
            'name' => '<script>alert("name")</script>',
            'message' => '<img src=x onerror=alert("message")>',
        ]);

        $html = (new ContactInquiryReceived($inquiry))->render();

        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringNotContainsString('<img src=x', $html);
        $this->assertStringContainsString('&lt;script&gt;', $html);
    }

    /**
     * @return array<string, string>
     */
    private function validPayload(): array
    {
        return [
            'name' => 'Aster Bekele',
            'email' => 'aster@example.com',
            'company' => 'Aster Imports',
            'product_interest' => 'coffee',
            'message' => 'Please send pricing for one container of Ethiopian coffee.',
            'website' => '',
        ];
    }
}
