<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        @php
            $seo = \App\Support\Seo::forRequest(request());
            $structuredData = \App\Support\Seo::structuredData($seo);
        @endphp
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Jemea Trading PLC">
        <meta name="application-name" content="Jemea Trading PLC">
        <meta name="format-detection" content="telephone=yes">
        <meta name="geo.region" content="ET-AA">
        <meta name="geo.placename" content="Addis Ababa">
        <meta name="theme-color" content="#f6f8f9" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#1a2228" media="(prefers-color-scheme: dark)">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #f6f8f9;
            }

            html.dark {
                background-color: #1a2228;
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
        <link rel="manifest" href="/site.webmanifest">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title data-inertia="">{{ $seo['title'] }}</title>
            <meta data-inertia="description" name="description" content="{{ $seo['description'] }}">
            <meta data-inertia="robots" name="robots" content="{{ $seo['robots'] }}">
            <meta data-inertia="googlebot" name="googlebot" content="{{ $seo['robots'] }}">
            <link data-inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">
            <link data-inertia="alternate-en" rel="alternate" hreflang="en" href="{{ $seo['canonical'] }}">
            <link data-inertia="alternate-default" rel="alternate" hreflang="x-default" href="{{ $seo['canonical'] }}">
            <meta data-inertia="og-title" property="og:title" content="{{ $seo['title'] }}">
            <meta data-inertia="og-description" property="og:description" content="{{ $seo['description'] }}">
            <meta data-inertia="og-type" property="og:type" content="{{ $seo['type'] }}">
            <meta data-inertia="og-url" property="og:url" content="{{ $seo['canonical'] }}">
            <meta data-inertia="og-image" property="og:image" content="{{ $seo['image'] }}">
            <meta data-inertia="og-image-alt" property="og:image:alt" content="Jemea Trading PLC Ethiopian import and export company">
            <meta property="og:image:width" content="1024">
            <meta property="og:image:height" content="556">
            <meta property="og:image:type" content="image/jpeg">
            <meta data-inertia="og-site-name" property="og:site_name" content="{{ config('seo.site_name') }}">
            <meta data-inertia="og-locale" property="og:locale" content="{{ config('seo.locale') }}">
            <meta data-inertia="twitter-card" name="twitter:card" content="{{ config('seo.twitter_card') }}">
            <meta data-inertia="twitter-title" name="twitter:title" content="{{ $seo['title'] }}">
            <meta data-inertia="twitter-description" name="twitter:description" content="{{ $seo['description'] }}">
            <meta data-inertia="twitter-image" name="twitter:image" content="{{ $seo['image'] }}">
            <meta name="twitter:image:alt" content="Jemea Trading PLC Ethiopian import and export company">
            @if (config('seo.google_site_verification'))
                <meta name="google-site-verification" content="{{ config('seo.google_site_verification') }}">
            @endif
            @if (config('seo.bing_site_verification'))
                <meta name="msvalidate.01" content="{{ config('seo.bing_site_verification') }}">
            @endif
            <script data-inertia="structured-data" type="application/ld+json">{!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!}</script>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
