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

    public function test_public_pages_include_server_rendered_seo_metadata(): void
    {
        $this->get('/products')
            ->assertOk()
            ->assertSee('Ethiopian Coffee, Seeds &amp; Import-Export Products | Jemea Trading', false)
            ->assertSee('data-inertia="description"', false)
            ->assertSee('href="'.url('/products').'" data-inertia="canonical"', false)
            ->assertSee('application/ld+json', false)
            ->assertSee('max-image-preview:large', false);
    }

    public function test_sitemap_lists_all_public_pages(): void
    {
        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee('<loc>'.url('/').'</loc>', false)
            ->assertSee('<loc>'.url('/products').'</loc>', false)
            ->assertDontSee('/admin');
    }

    public function test_robots_file_allows_public_pages_and_points_to_sitemap(): void
    {
        $this->get('/robots.txt')
            ->assertOk()
            ->assertSee('Allow: /', false)
            ->assertSee('Disallow: /admin', false)
            ->assertSee('Sitemap: '.route('seo.sitemap'), false);
    }

    public function test_contact_page_accepts_a_known_product_interest(): void
    {
        $this->get('/contact?product=pigeon-pea')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/contact')
                ->where('productInterest', 'pigeon-pea'));
    }

    public function test_contact_page_ignores_an_unknown_product_interest(): void
    {
        $this->get('/contact?product=unknown-product')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/contact')
                ->where('productInterest', null));
    }
}
