import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Globe,
    ShieldCheck,
    Truck,
    Award,
    ArrowRight,
    ChevronDown,
} from 'lucide-react';
import { useRef } from 'react';
import { ProductCard } from '@/components/public/product-card';
import { Reveal } from '@/components/public/reveal';
import { SectionHeading } from '@/components/public/section-heading';
import { Button } from '@/components/public/ui/button';
import { cn } from '@/lib/utils';

const products = [
    {
        title: 'Ethiopian Coffee Beans',
        description:
            'Premium Arabica coffee beans sourced from the birthplace of coffee. Sun-dried and washed varieties from Sidamo, Yirgacheffe, and Harar regions.',
        image: '/images/coffee_beans_hd.png',
    },
    {
        title: 'Sesame Seeds',
        description:
            'High-quality Humera and Wollega sesame seeds, prized globally for their rich oil content and distinctive nutty flavor profile.',
        image: '/images/sesame_seeds_hd.png',
    },
    {
        title: 'Niger Seeds',
        description:
            'Ethiopian niger seeds (noug) with exceptional oil yield, cultivated in the highlands for purity and nutritional richness.',
        image: '/images/niger_seeds_hd.png',
    },
    {
        title: 'Green Mung Beans',
        description:
            'Organic green mung beans with high protein content, carefully sorted and graded to meet international export standards.',
        image: '/images/green_mung_beans_hd.png',
    },
    {
        title: 'Soya Beans',
        description:
            "Non-GMO soya beans from Ethiopia's fertile soils, processed and packaged for international markets with strict quality control.",
        image: '/images/soya_beans_hd.png',
    },
    {
        title: 'Peanuts',
        description:
            'Bold kernel peanuts with superior taste and crunch. Sourced from select Ethiopian farms and graded to international standards.',
        image: '/images/peanut_beans_hd.png',
    },
];

const stats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '30+', label: 'Countries Served' },
    { value: '50K+', label: 'Tons Exported' },
    { value: '100%', label: 'Quality Certified' },
];

const highlights = [
    {
        icon: Globe,
        title: 'Global Reach',
        description:
            'Connecting Ethiopian agriculture to markets across Asia, Europe, the Middle East, and beyond.',
    },
    {
        icon: ShieldCheck,
        title: 'Quality Certified',
        description:
            'All products comply with international phytosanitary standards, packaging requirements, and certifications.',
    },
    {
        icon: Truck,
        title: 'Reliable Logistics',
        description:
            'End-to-end supply chain management ensuring timely delivery to any port worldwide.',
    },
    {
        icon: Award,
        title: 'Premium Grade',
        description:
            'Sourced directly from verified Ethiopian farmers and cooperatives for uncompromised quality.',
    },
];

export default function HomePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            <Head>
                <title>Jemea Trading PLC | Ethiopian Export Excellence</title>
                <meta
                    name="description"
                    content="Exporting Ethiopia's finest coffee, oil seeds, and agricultural products to the world. Quality, reliability, and global professionalism."
                />
            </Head>
            {/* ===== HERO SECTION ===== */}
            <section
                ref={heroRef}
                className="relative flex min-h-screen items-center overflow-hidden"
                style={{ position: 'relative' }}
            >
                <div className="absolute inset-0 bg-[var(--hero-bg)]" />
                <div className="ethiopian-pattern absolute inset-0 opacity-40" />

                <div
                    className="absolute top-0 right-0 h-full w-[60%] bg-gradient-to-bl from-brand-500/10 via-brand-600/5 to-transparent"
                    style={{
                        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
                    }}
                />

                <motion.div
                    style={{ y: heroY }}
                    className="absolute top-20 right-[15%] hidden h-32 w-32 rotate-45 border border-brand-500/20 lg:block"
                />
                <motion.div
                    style={{ y: heroY }}
                    className="absolute right-[25%] bottom-32 hidden h-20 w-20 rotate-12 border border-brand-500/15 lg:block"
                />
                <motion.div
                    style={{ y: heroY }}
                    className="absolute top-[40%] left-[8%] hidden h-16 w-16 rotate-45 bg-brand-500/5 lg:block"
                />

                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="site-gutter relative z-10 mx-auto w-full max-w-7xl"
                >
                    <div className="grid min-h-screen items-center gap-12 py-32 lg:grid-cols-2">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mb-8 flex items-center gap-3"
                            >
                                <span className="h-[2px] w-12 bg-brand-400" />
                                <span className="font-body text-xs font-semibold tracking-[0.3em] text-brand-300 uppercase">
                                    Ethiopian Export Excellence
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                            >
                                Global Trade.
                                <br />
                                <span className="text-brand-300">
                                    Local
                                </span>{' '}
                                Integrity.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/75"
                            >
                                Exporting Ethiopia&apos;s finest agricultural
                                treasures &mdash; coffee, oil seeds, and premium
                                crops &mdash; to discerning markets worldwide.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.65 }}
                                className="mt-10 flex flex-wrap gap-4"
                            >
                                <Button
                                    asChild
                                    variant="accent"
                                    size="lg"
                                    className="group"
                                >
                                    <Link href="/products">
                                        Explore Products
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-white/40 text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                                >
                                    <Link href="/about">Our Story</Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.85 }}
                                className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 + i * 0.1 }}
                                        className="text-center sm:text-left"
                                    >
                                        <div className="font-heading text-2xl font-bold text-brand-300">
                                            {stat.value}
                                        </div>
                                        <div className="mt-1 font-body text-[11px] tracking-wider text-white/50 uppercase">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative hidden items-center justify-center lg:flex"
                        >
                            <div className="relative w-full max-w-lg">
                                <div className="relative aspect-square">
                                    <div className="absolute inset-8 rotate-45 border-2 border-brand-400/30" />
                                    <div className="absolute inset-16 rotate-45 border border-brand-400/15" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative h-72 w-72">
                                            <img
                                                src="/images/coffee_beans_hd.png"
                                                alt="Ethiopian Coffee"
                                                width={640}
                                                height={480}
                                                fetchPriority="high"
                                                className="object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ y: [-8, 8, -8] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="absolute -top-4 -right-4 h-24 w-24"
                                >
                                    <img
                                        src="/images/sesame_seeds_hd.png"
                                        alt="Sesame Seeds"
                                        width={180}
                                        height={180}
                                        className="object-contain opacity-80"
                                    />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [6, -6, 6] }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 1,
                                    }}
                                    className="absolute -bottom-6 -left-6 h-28 w-28"
                                >
                                    <img
                                        src="/images/peanut_beans_hd.png"
                                        alt="Peanuts"
                                        width={160}
                                        height={160}
                                        className="object-contain opacity-80"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="font-body text-[10px] tracking-[0.2em] text-white/45 uppercase">
                            Scroll
                        </span>
                        <ChevronDown className="h-4 w-4 text-brand-400" />
                    </motion.div>
                </motion.div>

                <div
                    className="absolute right-0 bottom-0 left-0 h-16 bg-[var(--background)]"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)',
                    }}
                />
            </section>

            {/* ===== HIGHLIGHTS SECTION ===== */}
            <section className="relative py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <SectionHeading
                        label="Why Choose Us"
                        title="Built on Trust, Driven by Quality"
                        subtitle="We bridge Ethiopian agricultural excellence with global markets through integrity, precision, and unwavering commitment to quality."
                    />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        {highlights.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <div
                                    className={cn(
                                        'group relative border border-[var(--border)] bg-[var(--card)] p-6 lg:p-7',
                                        'transition-[border-color,transform,box-shadow] duration-500',
                                        'hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-xl',
                                    )}
                                >
                                    <div className="absolute top-0 left-0 h-[2px] w-10 bg-[var(--primary)] transition-[width] duration-500 group-hover:w-full" />
                                    <div className="absolute top-0 left-0 h-10 w-[2px] bg-[var(--primary)] transition-[height] duration-500 group-hover:h-full" />

                                    <item.icon
                                        className="mb-4 h-7 w-7 text-[var(--primary)]"
                                        strokeWidth={1.5}
                                    />
                                    <h3 className="mb-2 font-heading text-lg font-bold text-[var(--foreground)]">
                                        {item.title}
                                    </h3>
                                    <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                                        {item.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PRODUCTS SHOWCASE ===== */}
            <section className="relative py-28 md:py-36">
                <div className="angle-cut-both absolute inset-0 bg-[var(--hero-bg)]" />
                <div className="ethiopian-pattern absolute inset-0 opacity-30" />

                <div className="site-gutter relative z-10 mx-auto max-w-7xl py-4">
                    <SectionHeading
                        label="Our Products"
                        title="Ethiopia's Finest Exports"
                        subtitle="From the highlands of Sidamo to the plains of Humera, we source only the finest agricultural products for the global market."
                        light
                    />

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product, i) => (
                            <ProductCard
                                key={product.title}
                                title={product.title}
                                description={product.description}
                                image={product.image}
                                index={i}
                            />
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <div className="mt-16 text-center">
                            <Button
                                asChild
                                variant="accent"
                                size="lg"
                                className="group"
                            >
                                <Link href="/products">
                                    View All Products
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== ABOUT TEASER ===== */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <Reveal direction="left">
                            <div className="relative p-4">
                                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--secondary)]">
                                    <img
                                        src="/images/bag_of_peanut_coffe_seeds.png"
                                        alt="Ethiopian Agricultural Products"
                                        width={800}
                                        height={600}
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                    <div
                                        className="absolute right-0 bottom-0 h-2/5 w-2/5 bg-[var(--accent)]"
                                        style={{
                                            clipPath:
                                                'polygon(100% 0, 100% 100%, 0 100%)',
                                        }}
                                    >
                                        <div className="absolute right-4 bottom-4 text-right">
                                            <span className="font-heading text-3xl font-bold text-white">
                                                15+
                                            </span>
                                            <span className="mt-0.5 block font-body text-[10px] tracking-wider text-white/80 uppercase">
                                                Years of Excellence
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-0 bottom-0 -z-10 h-full w-full border-2 border-[var(--primary)]" />
                            </div>
                        </Reveal>

                        <div>
                            <Reveal direction="right">
                                <span className="mb-4 inline-flex items-center gap-3 font-body text-xs font-semibold tracking-[0.25em] text-[var(--primary)] uppercase">
                                    <span className="h-[2px] w-8 bg-[var(--primary)]" />
                                    About Us
                                </span>
                            </Reveal>

                            <Reveal direction="right" delay={0.1}>
                                <h2 className="mb-5 font-heading text-3xl leading-[1.15] font-bold text-[var(--foreground)] md:text-4xl">
                                    The Best of Ethiopia{' '}
                                    <span className="text-[var(--primary)]">
                                        to the World
                                    </span>
                                </h2>
                            </Reveal>

                            <Reveal direction="right" delay={0.2}>
                                <p className="mb-5 font-body text-base leading-relaxed text-[var(--muted-foreground)]">
                                    Jemea Trading PLC is an Ethiopian-based
                                    import-export company dedicated to bridging
                                    the gap between Ethiopia&apos;s rich
                                    agricultural heritage and global markets. We
                                    supply high-grade agricultural products
                                    sourced directly from verified farmers and
                                    cooperatives.
                                </p>
                            </Reveal>

                            <Reveal direction="right" delay={0.3}>
                                <p className="mb-6 font-body text-base leading-relaxed text-[var(--muted-foreground)]">
                                    From exporting premium seeds, beans, and
                                    nuts to importing high-quality industrial
                                    materials and vehicles &mdash; our company
                                    delivers comprehensive trade solutions with
                                    integrity and reliability.
                                </p>
                            </Reveal>

                            <Reveal direction="right" delay={0.4}>
                                <Button
                                    asChild
                                    variant="default"
                                    size="lg"
                                    className="group"
                                >
                                    <Link href="/about">
                                        Read Our Story
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== IMPORT SERVICES ===== */}
            <section className="ethiopian-pattern relative bg-[var(--secondary)] py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <SectionHeading
                        label="Import Solutions"
                        title="Trusted Import & Export Solutions"
                        subtitle="Beyond exports, we import high-quality polymer and plastic raw materials, as well as vehicles including Sinot trucks, BYD cars, and Toyota Land Cruisers."
                    />

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: 'Seeds, Beans & Nuts',
                                desc: 'Premium Ethiopian agricultural exports meeting international quality standards.',
                                image: '/images/bag_of_peanut_coffe_seeds.png',
                            },
                            {
                                title: 'Polymer & Plastic Materials',
                                desc: 'High-quality raw materials for industrial and manufacturing needs.',
                                image: '/images/polymer_and_plastic_raw_materials.png',
                            },
                            {
                                title: 'Vehicle Imports',
                                desc: 'BYD, Toyota Land Cruisers, and Sino trucks sourced for the Ethiopian market.',
                                image: '/images/vehicle_imports_hd.png',
                            },
                        ].map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.1}>
                                <div className="group relative overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-xl">
                                    <div className="relative h-44 overflow-hidden bg-[var(--muted)]">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            width={360}
                                            height={240}
                                            loading="lazy"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 p-6 pt-5">
                                        <h3 className="font-heading text-lg font-bold text-[var(--foreground)]">
                                            {item.title}
                                        </h3>
                                        <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--primary)] transition-[width] duration-500 group-hover:w-full" />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative overflow-hidden py-24 md:py-32">
                <div className="absolute inset-0 bg-[var(--hero-bg)]" />
                <div className="ethiopian-pattern absolute inset-0 opacity-30" />

                <div className="absolute top-10 left-10 hidden h-40 w-40 rotate-45 border border-brand-500/10 lg:block" />
                <div className="absolute right-10 bottom-10 hidden h-60 w-60 rotate-12 border border-brand-500/10 lg:block" />

                <div className="site-gutter relative z-10 mx-auto max-w-4xl text-center">
                    <Reveal>
                        <span className="mb-6 inline-flex items-center gap-3 font-body text-xs font-semibold tracking-[0.3em] text-brand-300 uppercase">
                            <span className="h-[2px] w-8 bg-brand-400" />
                            Start Trading
                            <span className="h-[2px] w-8 bg-brand-400" />
                        </span>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="font-heading text-3xl leading-[1.1] font-bold text-white md:text-4xl lg:text-5xl">
                            Ready to Source{' '}
                            <span className="text-brand-300">
                                Premium Ethiopian
                            </span>{' '}
                            Products?
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-white/75">
                            Choose the agricultural products you need and
                            contact us — we ensure reliable, timely delivery
                            wherever you are in the world.
                        </p>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                variant="accent"
                                size="lg"
                                className="group"
                            >
                                <Link href="/contact">
                                    Contact Us Today
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-white/40 text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                            >
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
