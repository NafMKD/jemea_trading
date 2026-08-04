import { Head, usePage } from '@inertiajs/react';

interface SeoData {
    title: string;
    description: string;
    canonical: string;
    image: string;
    robots: string;
    type: string;
    structuredData: Record<string, unknown>;
}

export function SeoHead() {
    const { seo } = usePage<{ seo: SeoData }>().props;

    return (
        <Head>
            <title>{seo.title}</title>
            <meta head-key="description" name="description" content={seo.description} />
            <meta head-key="robots" name="robots" content={seo.robots} />
            <meta head-key="googlebot" name="googlebot" content={seo.robots} />
            <link head-key="canonical" rel="canonical" href={seo.canonical} />
            <link head-key="alternate-en" rel="alternate" hrefLang="en" href={seo.canonical} />
            <link head-key="alternate-default" rel="alternate" hrefLang="x-default" href={seo.canonical} />
            <meta head-key="og-title" property="og:title" content={seo.title} />
            <meta head-key="og-description" property="og:description" content={seo.description} />
            <meta head-key="og-type" property="og:type" content={seo.type} />
            <meta head-key="og-url" property="og:url" content={seo.canonical} />
            <meta head-key="og-image" property="og:image" content={seo.image} />
            <meta head-key="og-image-alt" property="og:image:alt" content="Jemea Trading PLC Ethiopian import and export company" />
            <meta head-key="og-image-width" property="og:image:width" content="1024" />
            <meta head-key="og-image-height" property="og:image:height" content="556" />
            <meta head-key="og-image-type" property="og:image:type" content="image/jpeg" />
            <meta head-key="twitter-card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter-title" name="twitter:title" content={seo.title} />
            <meta head-key="twitter-description" name="twitter:description" content={seo.description} />
            <meta head-key="twitter-image" name="twitter:image" content={seo.image} />
            <meta head-key="twitter-image-alt" name="twitter:image:alt" content="Jemea Trading PLC Ethiopian import and export company" />
            <script
                head-key="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
            />
        </Head>
    );
}
