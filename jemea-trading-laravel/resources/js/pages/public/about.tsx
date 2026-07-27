import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye, Heart, Leaf } from 'lucide-react';
import { Reveal } from '@/components/public/reveal';
import { SectionHeading } from '@/components/public/section-heading';
import { Button } from '@/components/public/ui/button';
import { cn } from '@/lib/utils';

const values = [
    {
        icon: Heart,
        title: 'Integrity',
        description:
            'We conduct every transaction with honesty, transparency, and respect for all partners in our supply chain.',
    },
    {
        icon: Target,
        title: 'Quality First',
        description:
            'From farm to shipment, we maintain rigorous quality control ensuring every product meets international standards.',
    },
    {
        icon: Leaf,
        title: 'Sustainability',
        description:
            'Supporting Ethiopian farmers and cooperatives through fair trade practices and sustainable agricultural methods.',
    },
    {
        icon: Eye,
        title: 'Reliability',
        description:
            'Consistent delivery timelines and open communication throughout the entire export process.',
    },
];

const timeline = [
    {
        year: 'Founded',
        title: 'The Journey Begins',
        desc: 'Jemea Trading PLC was established in Addis Ababa with a vision to connect Ethiopian agriculture with the global market.',
    },
    {
        year: 'Growth',
        title: 'Expanding Horizons',
        desc: 'Expanded our export portfolio to include coffee, sesame, niger seeds, soya beans, peanuts, and castor seeds.',
    },
    {
        year: 'Global',
        title: 'International Recognition',
        desc: 'Reached over 30 countries, establishing trusted partnerships across Asia, Europe, and the Middle East.',
    },
    {
        year: 'Today',
        title: 'Comprehensive Trade Solutions',
        desc: 'Now offering both import and export services — from agricultural exports to vehicle and raw material imports.',
    },
];

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Us | Jemea Trading PLC</title>
                <meta
                    name="description"
                    content="Learn about Jemea Trading PLC, our Ethiopian roots, global trade experience, values, mission, and commitment to export quality."
                />
            </Head>
            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="absolute inset-0 bg-[var(--hero-bg)]" />
                <div className="ethiopian-pattern absolute inset-0 opacity-30" />
                <div
                    className="absolute top-0 right-0 h-full w-[50%] bg-gradient-to-bl from-brand-500/10 to-transparent"
                    style={{
                        clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)',
                    }}
                />

                <div className="site-gutter relative z-10 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="mb-6 inline-flex items-center gap-3 font-body text-xs font-semibold tracking-[0.3em] text-brand-300 uppercase">
                            <span className="h-[2px] w-12 bg-brand-400" />
                            Our Story
                        </span>
                        <h1 className="max-w-4xl font-heading text-4xl leading-[1.05] font-bold text-white md:text-5xl lg:text-6xl">
                            Rooted in Ethiopia,{' '}
                            <span className="text-brand-300">
                                Reaching the World
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/75">
                            For over fifteen years, Jemea Trading PLC has been
                            the bridge between Ethiopia&apos;s rich agricultural
                            heritage and global markets that value quality,
                            authenticity, and trust.
                        </p>
                    </motion.div>
                </div>

                <div
                    className="absolute right-0 bottom-0 left-0 h-16 bg-[var(--background)]"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)',
                    }}
                />
            </section>

            {/* ===== COMPANY STORY ===== */}
            <section className="py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <Reveal>
                                <span className="mb-4 inline-flex items-center gap-3 font-body text-xs font-semibold tracking-[0.25em] text-[var(--primary)] uppercase">
                                    <span className="h-[2px] w-8 bg-[var(--primary)]" />
                                    Who We Are
                                </span>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <h2 className="mb-6 font-heading text-3xl leading-[1.15] font-bold text-[var(--foreground)] md:text-4xl">
                                    The Dynamic Duo Behind{' '}
                                    <span className="text-[var(--primary)]">
                                        the Plow
                                    </span>
                                </h2>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <p className="mb-5 font-body text-base leading-relaxed text-[var(--muted-foreground)]">
                                    Jemea Trading PLC was born from a passion
                                    for Ethiopian agriculture and a
                                    determination to showcase its potential on
                                    the global stage. Based in the heart of
                                    Addis Ababa, we have built a reputation for
                                    integrity, quality, and reliability in
                                    international trade.
                                </p>
                            </Reveal>

                            <Reveal delay={0.3}>
                                <p className="mb-5 font-body text-base leading-relaxed text-[var(--muted-foreground)]">
                                    We supply high-grade agricultural products
                                    sourced directly from verified Ethiopian
                                    farmers and cooperatives. All products
                                    follow international quality standards,
                                    packaging requirements, and phytosanitary
                                    regulations. Our commitment extends beyond
                                    profit — we believe in empowering the
                                    communities that grow these exceptional
                                    products.
                                </p>
                            </Reveal>

                            <Reveal delay={0.4}>
                                <p className="font-body text-base leading-relaxed text-[var(--muted-foreground)]">
                                    From the fragrant coffee highlands of Sidamo
                                    and Yirgacheffe to the sesame fields of
                                    Humera, we curate Ethiopia&apos;s
                                    agricultural wealth and deliver it to the
                                    world with care and precision.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal direction="right">
                            <div className="relative p-4">
                                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--secondary)]">
                                    <img
                                        src="/images/top_view_of_addis_ababa.png"
                                        alt="Addis Ababa, Ethiopia"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-4 left-4 z-10 flex h-36 w-36 items-center justify-center bg-[var(--accent)]">
                                    <div className="text-center">
                                        <span className="block font-heading text-3xl font-bold text-white">
                                            15+
                                        </span>
                                        <span className="font-body text-[10px] tracking-wider text-white/80 uppercase">
                                            Years in Trade
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 -z-10 h-full w-full border-2 border-[var(--primary)]" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== MISSION & VISION ===== */}
            <section className="relative py-28 md:py-36">
                <div className="angle-cut-both absolute inset-0 bg-[var(--hero-bg)]" />
                <div className="ethiopian-pattern absolute inset-0 opacity-20" />

                <div className="site-gutter relative z-10 mx-auto max-w-7xl">
                    <div className="grid gap-12 md:grid-cols-2">
                        <Reveal>
                            <div className="border border-brand-500/20 bg-slate-950/50 p-8 backdrop-blur-sm md:p-10">
                                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-brand-500/15">
                                    <Target className="h-5 w-5 text-brand-300" />
                                </div>
                                <h3 className="mb-3 font-heading text-2xl font-bold text-white">
                                    Our Mission
                                </h3>
                                <p className="font-body text-base leading-relaxed text-white/75">
                                    To be Ethiopia&apos;s most trusted
                                    agricultural export partner by delivering
                                    premium-quality products with uncompromising
                                    standards, fostering sustainable farming
                                    practices, and building lasting
                                    relationships with international buyers who
                                    share our commitment to excellence.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div className="border border-brand-500/20 bg-slate-950/50 p-8 backdrop-blur-sm md:p-10">
                                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-brand-500/15">
                                    <Eye className="h-5 w-5 text-brand-300" />
                                </div>
                                <h3 className="mb-3 font-heading text-2xl font-bold text-white">
                                    Our Vision
                                </h3>
                                <p className="font-body text-base leading-relaxed text-white/75">
                                    To position Ethiopian agricultural products
                                    as the gold standard in global trade. We
                                    envision a future where every buyer
                                    worldwide recognizes Ethiopia not just as
                                    the birthplace of coffee, but as the source
                                    of the world&apos;s finest seeds, beans, and
                                    agricultural exports.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <SectionHeading
                        label="Our Values"
                        title="What Drives Us Forward"
                        subtitle="The principles that guide every decision, every partnership, and every shipment."
                    />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        {values.map((value, i) => (
                            <Reveal key={value.title} delay={i * 0.1}>
                                <div
                                    className={cn(
                                        'group relative border border-[var(--border)] bg-[var(--card)] p-6 lg:p-7',
                                        'transition-all duration-500',
                                        'hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-xl',
                                    )}
                                >
                                    <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
                                        <div className="absolute top-0 right-0 h-[2px] w-[90px] origin-top-right translate-x-[15px] translate-y-[22px] rotate-[-45deg] bg-[var(--primary)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </div>

                                    <value.icon
                                        className="mb-4 h-7 w-7 text-[var(--primary)]"
                                        strokeWidth={1.5}
                                    />
                                    <h3 className="mb-2 font-heading text-lg font-bold text-[var(--foreground)]">
                                        {value.title}
                                    </h3>
                                    <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                                        {value.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE ===== */}
            <section className="ethiopian-pattern bg-[var(--secondary)] py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-5xl">
                    <SectionHeading
                        label="Our Journey"
                        title="Milestones That Define Us"
                    />

                    <div className="relative">
                        <div className="absolute top-0 bottom-0 left-8 w-[2px] -translate-x-1/2 bg-[var(--border)] md:left-1/2" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <Reveal key={item.year} delay={i * 0.1}>
                                    <div
                                        className={cn(
                                            'relative flex items-start gap-8',
                                            'md:gap-16',
                                            i % 2 === 0
                                                ? 'md:flex-row'
                                                : 'md:flex-row-reverse',
                                        )}
                                    >
                                        <div className="absolute left-8 z-10 mt-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[var(--primary)] md:left-1/2" />

                                        <div
                                            className={cn(
                                                'ml-16 md:ml-0 md:w-[calc(50%-3rem)]',
                                                i % 2 === 0
                                                    ? 'md:text-right'
                                                    : 'md:text-left',
                                            )}
                                        >
                                            <span className="font-body text-xs font-semibold tracking-[0.2em] text-[var(--primary)] uppercase">
                                                {item.year}
                                            </span>
                                            <h3 className="mt-1 mb-2 font-heading text-2xl font-bold text-[var(--foreground)]">
                                                {item.title}
                                            </h3>
                                            <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-4xl text-center">
                    <Reveal>
                        <h2 className="font-heading text-3xl leading-[1.15] font-bold text-[var(--foreground)] md:text-4xl">
                            Partner with Ethiopia&apos;s{' '}
                            <span className="text-[var(--primary)]">
                                Trusted Exporters
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-[var(--muted-foreground)]">
                            Whether you&apos;re sourcing premium coffee beans,
                            oil seeds, or any of our agricultural products,
                            we&apos;re ready to serve you with excellence.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="mt-10">
                            <Link href="/contact">
                                <Button
                                    variant="accent"
                                    size="lg"
                                    className="group"
                                >
                                    Get In Touch
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
