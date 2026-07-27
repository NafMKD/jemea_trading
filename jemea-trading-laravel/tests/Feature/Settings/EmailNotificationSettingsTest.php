<?php

namespace Tests\Feature\Settings;

use App\Jobs\SendContactInquiryNotification;
use App\Mail\ContactInquiryReceived;
use App\Models\ContactInquiry;
use App\Models\EmailNotificationSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EmailNotificationSettingsTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->admin()->create();
    }

    public function test_administrator_can_view_email_notification_settings(): void
    {
        $this->actingAsConfirmedAdmin()
            ->get(route('email-notifications.edit'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/email-notifications')
                ->where('settings.notifications_enabled', true)
                ->where('settings.is_persisted', false)
                ->missing('settings.smtp_password'));
    }

    public function test_email_settings_require_recent_password_confirmation(): void
    {
        $this->actingAs($this->admin)
            ->get(route('email-notifications.edit'))
            ->assertRedirect(route('password.confirm'));
    }

    public function test_staff_cannot_access_email_notification_settings(): void
    {
        $staff = User::factory()->create();

        $this->actingAs($staff)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->get(route('email-notifications.edit'))
            ->assertForbidden();
    }

    public function test_administrator_can_save_settings_with_an_encrypted_password(): void
    {
        $this->actingAsConfirmedAdmin()
            ->patch(route('email-notifications.update'), $this->validPayload())
            ->assertRedirect()
            ->assertSessionHas('toast.type', 'success');

        $setting = EmailNotificationSetting::query()->sole();

        $this->assertTrue($setting->notifications_enabled);
        $this->assertSame('smtp.example.com', $setting->smtp_host);
        $this->assertSame('smtp-secret', $setting->smtp_password);
        $this->assertSame('alerts@example.com', $setting->notification_email);
        $this->assertNotSame(
            'smtp-secret',
            DB::table('email_notification_settings')->value('smtp_password'),
        );
    }

    public function test_stored_password_is_never_returned_to_the_browser(): void
    {
        EmailNotificationSetting::query()->create([
            ...$this->modelPayload(),
            'smtp_password' => 'smtp-secret',
        ]);

        $this->actingAsConfirmedAdmin()
            ->get(route('email-notifications.edit'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('settings.has_password', true)
                ->where('settings.is_persisted', true)
                ->missing('settings.smtp_password'));
    }

    public function test_blank_password_preserves_the_existing_secret(): void
    {
        $setting = EmailNotificationSetting::query()->create([
            ...$this->modelPayload(),
            'smtp_password' => 'existing-secret',
        ]);

        $this->actingAsConfirmedAdmin()
            ->patch(route('email-notifications.update'), [
                ...$this->validPayload(),
                'smtp_password' => '',
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame('existing-secret', $setting->fresh()->smtp_password);
    }

    public function test_administrator_can_remove_the_stored_password(): void
    {
        $setting = EmailNotificationSetting::query()->create([
            ...$this->modelPayload(),
            'smtp_password' => 'existing-secret',
        ]);

        $this->actingAsConfirmedAdmin()
            ->patch(route('email-notifications.update'), [
                ...$this->validPayload(),
                'smtp_password' => '',
                'clear_password' => true,
            ])
            ->assertSessionHasNoErrors();

        $this->assertNull($setting->fresh()->smtp_password);
    }

    public function test_disabled_notifications_store_inquiry_without_queuing_email(): void
    {
        Queue::fake();
        EmailNotificationSetting::query()->create([
            ...$this->modelPayload(),
            'notifications_enabled' => false,
        ]);

        $this->post(route('contact.store'), $this->contactPayload())
            ->assertRedirect(route('contact.create'));

        $this->assertDatabaseCount('contact_inquiries', 1);
        Queue::assertNotPushed(SendContactInquiryNotification::class);
    }

    public function test_notification_job_uses_stored_smtp_and_destination_settings(): void
    {
        Mail::fake();
        EmailNotificationSetting::query()->create([
            ...$this->modelPayload(),
            'smtp_password' => 'smtp-secret',
        ]);
        $inquiry = ContactInquiry::factory()->create();

        (new SendContactInquiryNotification($inquiry))->handle();

        $this->assertSame('smtp.example.com', config('mail.mailers.smtp.host'));
        $this->assertSame(587, config('mail.mailers.smtp.port'));
        $this->assertSame('alerts@example.com', config('mail.contact_to'));
        Mail::assertSent(
            ContactInquiryReceived::class,
            fn (ContactInquiryReceived $mail): bool => $mail->hasTo('alerts@example.com'),
        );
        $this->assertNotNull($inquiry->fresh()->email_sent_at);
    }

    public function test_administrator_can_send_a_test_email(): void
    {
        Mail::fake();
        EmailNotificationSetting::query()->create($this->modelPayload());

        $this->actingAsConfirmedAdmin()
            ->post(route('email-notifications.test'))
            ->assertRedirect()
            ->assertSessionHas('toast.type', 'success');
    }

    private function actingAsConfirmedAdmin(): static
    {
        return $this
            ->actingAs($this->admin)
            ->withSession(['auth.password_confirmed_at' => time()]);
    }

    /**
     * @return array<string, mixed>
     */
    private function validPayload(): array
    {
        return [
            ...$this->modelPayload(),
            'smtp_password' => 'smtp-secret',
            'clear_password' => false,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function modelPayload(): array
    {
        return [
            'id' => EmailNotificationSetting::SINGLETON_ID,
            'notifications_enabled' => true,
            'smtp_host' => 'smtp.example.com',
            'smtp_port' => 587,
            'smtp_username' => 'mailer@example.com',
            'smtp_encryption' => 'tls',
            'from_address' => 'mailer@example.com',
            'from_name' => 'Jemea Trading PLC',
            'notification_email' => 'alerts@example.com',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function contactPayload(): array
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
