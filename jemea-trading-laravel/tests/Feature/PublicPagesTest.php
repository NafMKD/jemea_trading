<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    #[DataProvider('publicPages')]
    public function test_public_pages_render_the_expected_inertia_component(
        string $route,
        string $component,
    ): void {
        $this->get($route)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component($component));
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function publicPages(): array
    {
        return [
            'home' => ['/', 'public/home'],
            'about' => ['/about', 'public/about'],
            'products' => ['/products', 'public/products'],
            'contact' => ['/contact', 'public/contact'],
        ];
    }
}
