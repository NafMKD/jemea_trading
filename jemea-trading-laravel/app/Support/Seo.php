<?php

namespace App\Support;

use Illuminate\Http\Request;

class Seo
{
    /**
     * @return array<string, mixed>
     */
    public static function forRequest(Request $request): array
    {
        $routeName = $request->route()?->getName();
        $page = config('seo.pages')[$routeName] ?? null;

        if (! is_array($page)) {
            return [
                'title' => config('app.name', 'Jemea Trading PLC'),
                'description' => '',
                'canonical' => $request->url(),
                'image' => url(config('seo.default_image')),
                'robots' => 'noindex, nofollow, noarchive',
                'type' => 'website',
            ];
        }

        return [
            ...$page,
            'canonical' => url($page['path']),
            'image' => url($page['image'] ?? config('seo.default_image')),
            'robots' => 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'type' => 'website',
        ];
    }

    /**
     * @param  array<string, mixed>  $seo
     * @return array<string, mixed>
     */
    public static function structuredData(array $seo): array
    {
        $baseUrl = rtrim(config('app.url'), '/');
        $company = config('seo.company');
        $graph = [
            [
                '@type' => 'Organization',
                '@id' => $baseUrl.'/#organization',
                'name' => config('seo.site_name'),
                'url' => $baseUrl,
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => $baseUrl.'/images/logo.jpg',
                ],
                'description' => config('seo.pages.home.description'),
                'email' => $company['email'],
                'telephone' => $company['phones'][0],
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => $company['address']['street'],
                    'addressLocality' => $company['address']['city'],
                    'addressCountry' => $company['address']['country'],
                ],
                'contactPoint' => [
                    '@type' => 'ContactPoint',
                    'telephone' => $company['phones'][0],
                    'email' => $company['email'],
                    'contactType' => 'sales',
                    'areaServed' => 'Worldwide',
                    'availableLanguage' => ['English', 'Amharic'],
                ],
            ],
            [
                '@type' => 'WebSite',
                '@id' => $baseUrl.'/#website',
                'url' => $baseUrl,
                'name' => config('seo.site_name'),
                'publisher' => ['@id' => $baseUrl.'/#organization'],
                'inLanguage' => 'en',
            ],
            [
                '@type' => 'WebPage',
                '@id' => $seo['canonical'].'#webpage',
                'url' => $seo['canonical'],
                'name' => $seo['title'],
                'description' => $seo['description'],
                'isPartOf' => ['@id' => $baseUrl.'/#website'],
                'about' => ['@id' => $baseUrl.'/#organization'],
                'primaryImageOfPage' => ['@type' => 'ImageObject', 'url' => $seo['image']],
                'inLanguage' => 'en',
            ],
        ];

        if (($seo['path'] ?? '/') !== '/') {
            $graph[] = [
                '@type' => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $baseUrl],
                    ['@type' => 'ListItem', 'position' => 2, 'name' => $seo['title'], 'item' => $seo['canonical']],
                ],
            ];
        }

        return ['@context' => 'https://schema.org', '@graph' => $graph];
    }
}
