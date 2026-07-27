import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '@/components/public/reveal';
import { Button } from '@/components/public/ui/button';
import { cn } from '@/lib/utils';

interface Product {
    id: string;
    title: string;
    category: 'export' | 'import';
    shortDesc: string;
    fullDesc: string;
    specs: string[];
    image: string;
}

const products: Product[] = [
    {
        id: 'coffee',
        title: 'Ethiopian Coffee Beans',
        category: 'export',
        shortDesc: 'Premium Arabica from the birthplace of coffee.',
        fullDesc:
            'Our Ethiopian coffee beans are sourced from the renowned growing regions of Sidamo, Yirgacheffe, and Harar. Available in both sun-dried and washed varieties, each bean carries the distinctive flavor profile that has made Ethiopian coffee legendary worldwide — from fruity and floral Yirgacheffe to the bold, wine-like Harar.',
        specs: [
            'Origin: Sidamo, Yirgacheffe, Harar',
            'Varieties: Sun-dried & Washed',
            'Grade: Premium Export Quality',
            'Certifications: Phytosanitary compliant',
        ],
        image: '/images/coffee_beans_hd.png',
    },
    {
        id: 'sesame',
        title: 'Sesame Seeds',
        category: 'export',
        shortDesc: 'High oil-content Humera and Wollega varieties.',
        fullDesc:
            'Ethiopian sesame seeds from the Humera and Wollega regions are prized globally for their exceptional oil content and distinctive nutty flavor. Our sesame seeds undergo rigorous cleaning, grading, and quality inspection before export, meeting the highest international standards for purity.',
        specs: [
            'Origin: Humera, Wollega',
            'Oil Content: 50-55%',
            'Grade: Export Premium',
            'Packaging: 25kg/50kg bags',
        ],
        image: '/images/sesame_seeds_hd.png',
    },
    {
        id: 'niger',
        title: 'Niger Seeds',
        category: 'export',
        shortDesc: 'Exceptional oil yield from Ethiopian highlands.',
        fullDesc:
            'Ethiopian niger seeds (noug) are cultivated in the highlands, producing seeds with exceptional oil yield and nutritional richness. Used extensively in cooking oil production and bird feed globally, our niger seeds are carefully harvested and processed to preserve their natural qualities.',
        specs: [
            'Origin: Ethiopian Highlands',
            'Oil Yield: High extraction rate',
            'Grade: Export Quality',
            'Use: Cooking oil, Bird feed',
        ],
        image: '/images/niger_seeds_hd.png',
    },
    {
        id: 'mung',
        title: 'Green Mung Beans',
        category: 'export',
        shortDesc: 'Organic, high-protein beans for global markets.',
        fullDesc:
            'Our green mung beans are organically grown with high protein content, carefully sorted and graded to meet international export standards. These versatile legumes are in high demand across Asian markets for their nutritional value and culinary versatility.',
        specs: [
            'Protein Content: 24-26%',
            'Grade: Sorted & Graded',
            'Certification: Organic available',
            'Markets: Asia, Middle East',
        ],
        image: '/images/green_mung_beans_hd.png',
    },
    {
        id: 'soya',
        title: 'Soya Beans',
        category: 'export',
        shortDesc: "Non-GMO soya from Ethiopia's fertile soils.",
        fullDesc:
            "Ethiopia's fertile soils produce exceptional non-GMO soya beans with superior nutritional profiles. Our soya beans are processed and packaged under strict quality control for international markets, ideal for food processing, animal feed, and oil extraction.",
        specs: [
            'Type: Non-GMO',
            'Protein: 36-40%',
            'Moisture: <13%',
            'Packaging: Customizable',
        ],
        image: '/images/soya_beans_hd.png',
    },
    {
        id: 'peanuts',
        title: 'Peanuts',
        category: 'export',
        shortDesc: 'Bold kernel peanuts with superior taste.',
        fullDesc:
            "Our bold kernel peanuts are sourced from select Ethiopian farms, known for their superior taste and satisfying crunch. Graded to international standards, they're perfect for snacking, confectionery, and oil extraction purposes.",
        specs: [
            'Type: Bold Kernel',
            'Grade: International Standard',
            'Moisture: <8%',
            'Use: Snacking, Confectionery, Oil',
        ],
        image: '/images/peanut_beans_hd.png',
    },
    {
        id: 'castor',
        title: 'Castor Seeds',
        category: 'export',
        shortDesc: 'Industrial-grade castor seeds for oil production.',
        fullDesc:
            'Ethiopian castor seeds are valued for their high oil content and industrial applications. From pharmaceuticals to cosmetics and industrial lubricants, our castor seeds meet the demanding specifications of global buyers.',
        specs: [
            'Oil Content: 45-55%',
            'Grade: Industrial Export',
            'Applications: Pharma, Cosmetics',
            'Packaging: 50kg bags',
        ],
        image: '/images/castor_seeds_hd.png',
    },
    {
        id: 'pigeon-pea',
        title: 'Pigeon Pea',
        category: 'export',
        shortDesc: 'Protein-rich red gram pulses for global tables.',
        fullDesc:
            'Ethiopian pigeon peas (Cajanus cajan), also known as red gram or toor dal, are sun-grown in warm lowland regions and prized for their rich, nutty flavor and high protein content. A staple pulse across Asia, Africa, and the Caribbean, our pigeon peas are cleaned, sorted, and graded to meet strict international standards — available as whole seeds or split for dal.',
        specs: [
            'Botanical Name: Cajanus cajan',
            'Protein Content: 20-22%',
            'Form: Whole seeds & split (dal)',
            'Markets: India, Africa, Caribbean',
        ],
        image: '/images/pigeon_pea.png',
    },
    {
        id: 'polymer',
        title: 'Polymer & Plastic Raw Materials',
        category: 'import',
        shortDesc: 'High-quality raw materials for manufacturing.',
        fullDesc:
            "We import premium polymer and plastic raw materials to serve Ethiopia's growing manufacturing sector. Our materials meet international quality specifications and are sourced from trusted global suppliers.",
        specs: [
            'Types: PP, PE, PVC, PET',
            'Grade: Industrial Standard',
            'Source: Global suppliers',
            'Delivery: Reliable logistics',
        ],
        image: '/images/polymer_and_plastic_raw_materials.png',
    },
    {
        id: 'vehicles',
        title: 'Vehicle Imports',
        category: 'import',
        shortDesc: 'BYD, Land Cruisers, and Sino trucks.',
        fullDesc:
            'From BYD electric vehicles and Toyota Land Cruisers to Sino heavy-duty trucks, we provide comprehensive vehicle import solutions for the Ethiopian market, ensuring quality and competitive pricing.',
        specs: [
            'Brands: BYD, Toyota, Sino',
            'Types: Cars, SUVs, Trucks',
            'Condition: Brand New',
            'Service: End-to-end import',
        ],
        image: '/images/vehicle_imports_hd.png',
    },
];

export default function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [filter, setFilter] = useState<'all' | 'export' | 'import'>('all');

    const filtered = products.filter(
        (p) => filter === 'all' || p.category === filter,
    );

    return (
        <>
            <Head>
                <title>Products | Jemea Trading PLC</title>
                <meta
                    name="description"
                    content="Explore Jemea Trading PLC's Ethiopian coffee, oil seeds, pulses, agricultural exports, polymers, and vehicle import services."
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
                            Our Products
                        </span>
                        <h1 className="max-w-4xl font-heading text-4xl leading-[1.05] font-bold text-white md:text-5xl lg:text-6xl">
                            Premium Products,{' '}
                            <span className="text-brand-300">
                                Global Standards
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/75">
                            Discover our comprehensive range of export and
                            import products, each meeting the highest
                            international quality standards.
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

            {/* ===== PRODUCTS GRID ===== */}
            <section className="py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <Reveal>
                        <div className="mb-16 flex items-center justify-center gap-2">
                            {(['all', 'export', 'import'] as const).map(
                                (tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setFilter(tab)}
                                        className={cn(
                                            'cursor-pointer border px-6 py-2.5 font-body text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300',
                                            filter === tab
                                                ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                                                : 'border-[var(--border)] bg-transparent text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
                                        )}
                                    >
                                        {tab === 'all'
                                            ? 'All Products'
                                            : `${tab} Products`}
                                    </button>
                                ),
                            )}
                        </div>
                    </Reveal>

                    <motion.div
                        layout
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.05,
                                    }}
                                >
                                    <div
                                        onClick={() =>
                                            setSelectedProduct(product)
                                        }
                                        className={cn(
                                            'group relative cursor-pointer',
                                            'border border-[var(--border)] bg-[var(--card)]',
                                            'transition-all duration-500',
                                            'hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-2xl',
                                        )}
                                    >
                                        <div className="absolute top-4 left-4 z-10">
                                            <span
                                                className={cn(
                                                    'px-3 py-1 font-body text-[10px] font-semibold tracking-wider uppercase',
                                                    product.category ===
                                                        'export'
                                                        ? 'bg-brand-500 text-white'
                                                        : 'bg-accent-500 text-white',
                                                )}
                                            >
                                                {product.category}
                                            </span>
                                        </div>

                                        <div className="absolute top-0 right-0 z-10 h-16 w-16 overflow-hidden">
                                            <div className="absolute top-0 right-0 h-[2px] w-[90px] origin-top-right translate-x-[15px] translate-y-[22px] rotate-[-45deg] bg-[var(--primary)] transition-all duration-500 group-hover:w-[120px]" />
                                        </div>

                                        <div className="relative h-48 overflow-hidden bg-[var(--secondary)]">
                                            <div className="absolute inset-0 flex items-center justify-center p-10">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    width={220}
                                                    height={170}
                                                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 px-6 pt-5 pb-6">
                                            <h3 className="font-heading text-lg font-bold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)]">
                                                {product.title}
                                            </h3>
                                            <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                                                {product.shortDesc}
                                            </p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="h-[2px] w-0 bg-[var(--primary)] transition-all duration-500 group-hover:w-8" />
                                                <span className="font-body text-xs tracking-wider text-[var(--primary)] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                                    Details
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ===== PRODUCT MODAL ===== */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[var(--border)] bg-[var(--card)] shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center bg-[var(--secondary)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                <div className="relative h-64 min-h-[280px] bg-[var(--secondary)] md:h-auto">
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.title}
                                        className="object-contain p-12"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className={cn(
                                                'px-3 py-1 font-body text-[10px] font-semibold tracking-wider uppercase',
                                                selectedProduct.category ===
                                                    'export'
                                                    ? 'bg-brand-500 text-white'
                                                    : 'bg-accent-500 text-white',
                                            )}
                                        >
                                            {selectedProduct.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5 p-6 pr-14 md:p-8 md:pr-16">
                                    <div>
                                        <h2 className="mb-3 font-heading text-2xl font-bold text-[var(--foreground)]">
                                            {selectedProduct.title}
                                        </h2>
                                        <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
                                            {selectedProduct.fullDesc}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="mb-3 font-body text-xs font-semibold tracking-[0.15em] text-[var(--primary)] uppercase">
                                            Specifications
                                        </h4>
                                        <ul className="space-y-2">
                                            {selectedProduct.specs.map(
                                                (spec) => (
                                                    <li
                                                        key={spec}
                                                        className="flex items-start gap-2 font-body text-sm text-[var(--muted-foreground)]"
                                                    >
                                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--primary)]" />
                                                        {spec}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <div className="mt-auto pt-2">
                                        <Link href="/contact">
                                            <Button
                                                variant="accent"
                                                className="group w-full"
                                            >
                                                Request a Quote
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== CTA ===== */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[var(--hero-bg)]" />
                <div className="ethiopian-pattern absolute inset-0 opacity-20" />

                <div className="site-gutter relative z-10 mx-auto max-w-4xl text-center">
                    <Reveal>
                        <h2 className="font-heading text-3xl leading-[1.1] font-bold text-white md:text-4xl lg:text-5xl">
                            Need a{' '}
                            <span className="text-brand-300">
                                Custom Order?
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-white/75">
                            We accommodate custom quantities, packaging, and
                            specifications. Contact us to discuss your
                            requirements.
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
                                    Get a Custom Quote
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
