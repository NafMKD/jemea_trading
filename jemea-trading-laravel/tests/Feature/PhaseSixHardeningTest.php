<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PhaseSixHardeningTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_responses_include_security_headers(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->assertHeader(
                'Permissions-Policy',
                'camera=(), microphone=(), geolocation=(), payment=()',
            );
    }

    public function test_admin_responses_include_security_headers(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN');
    }

    public function test_unknown_routes_return_not_found(): void
    {
        $this->get('/this-route-does-not-exist')->assertNotFound();
    }

    public function test_critical_public_assets_exist(): void
    {
        $this->assertFileExists(public_path('images/logo.jpg'));
        $this->assertFileExists(public_path('images/hero_image.png'));
        $this->assertFileExists(public_path('images/coffee_beans_hd.png'));
        $this->assertFileExists(public_path('favicon.ico'));
    }
}
