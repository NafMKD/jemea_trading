<?php

return [
    'site_name' => 'Jemea Trading PLC',
    'default_image' => '/images/logo.jpg',
    'locale' => 'en_US',
    'twitter_card' => 'summary_large_image',
    'google_site_verification' => env('GOOGLE_SITE_VERIFICATION'),
    'bing_site_verification' => env('BING_SITE_VERIFICATION'),
    'company' => [
        'email' => 'info@jemeatrading.com',
        'phones' => ['+251900076995', '+251911205118'],
        'address' => [
            'street' => 'Arada Sub City, Woreda 01, Somali Tera, Beto Building, Office 316',
            'city' => 'Addis Ababa',
            'country' => 'ET',
        ],
    ],
    'pages' => [
        'home' => [
            'path' => '/',
            'title' => 'Jemea Trading PLC | Ethiopian Import & Export Company',
            'description' => 'Jemea Trading PLC exports Ethiopian coffee, sesame, oil seeds, pulses and agricultural products, and provides vehicle and polymer import services worldwide.',
        ],
        'about' => [
            'path' => '/about',
            'title' => 'About Jemea Trading PLC | Ethiopian Global Trade Partner',
            'description' => 'Discover Jemea Trading PLC, an Addis Ababa import-export company connecting Ethiopian agriculture with global markets through quality, integrity and reliable logistics.',
        ],
        'products.index' => [
            'path' => '/products',
            'title' => 'Ethiopian Coffee, Seeds & Import-Export Products | Jemea Trading',
            'description' => 'Source Ethiopian Arabica coffee, Humera sesame, niger, mung and soya beans, peanuts, castor seeds and pigeon peas, plus polymers and vehicle import services.',
        ],
        'contact.create' => [
            'path' => '/contact',
            'title' => 'Contact Jemea Trading PLC | Request an Import-Export Quote',
            'description' => 'Contact Jemea Trading PLC in Addis Ababa for Ethiopian coffee and agricultural export pricing, product sourcing, bulk orders, logistics and import inquiries.',
        ],
    ],
];
