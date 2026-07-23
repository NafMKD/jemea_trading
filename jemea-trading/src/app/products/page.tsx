"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  category: "export" | "import";
  shortDesc: string;
  fullDesc: string;
  specs: string[];
  image: string;
}

const products: Product[] = [
  {
    id: "coffee",
    title: "Ethiopian Coffee Beans",
    category: "export",
    shortDesc: "Premium Arabica from the birthplace of coffee.",
    fullDesc:
      "Our Ethiopian coffee beans are sourced from the renowned growing regions of Sidamo, Yirgacheffe, and Harar. Available in both sun-dried and washed varieties, each bean carries the distinctive flavor profile that has made Ethiopian coffee legendary worldwide — from fruity and floral Yirgacheffe to the bold, wine-like Harar.",
    specs: [
      "Origin: Sidamo, Yirgacheffe, Harar",
      "Varieties: Sun-dried & Washed",
      "Grade: Premium Export Quality",
      "Certifications: Phytosanitary compliant",
    ],
    image: "/images/coffee_beans_hd.png",
  },
  {
    id: "sesame",
    title: "Sesame Seeds",
    category: "export",
    shortDesc: "High oil-content Humera and Wollega varieties.",
    fullDesc:
      "Ethiopian sesame seeds from the Humera and Wollega regions are prized globally for their exceptional oil content and distinctive nutty flavor. Our sesame seeds undergo rigorous cleaning, grading, and quality inspection before export, meeting the highest international standards for purity.",
    specs: [
      "Origin: Humera, Wollega",
      "Oil Content: 50-55%",
      "Grade: Export Premium",
      "Packaging: 25kg/50kg bags",
    ],
    image: "/images/sesame_seeds_hd.png",
  },
  {
    id: "niger",
    title: "Niger Seeds",
    category: "export",
    shortDesc: "Exceptional oil yield from Ethiopian highlands.",
    fullDesc:
      "Ethiopian niger seeds (noug) are cultivated in the highlands, producing seeds with exceptional oil yield and nutritional richness. Used extensively in cooking oil production and bird feed globally, our niger seeds are carefully harvested and processed to preserve their natural qualities.",
    specs: [
      "Origin: Ethiopian Highlands",
      "Oil Yield: High extraction rate",
      "Grade: Export Quality",
      "Use: Cooking oil, Bird feed",
    ],
    image: "/images/niger_seeds_hd.png",
  },
  {
    id: "mung",
    title: "Green Mung Beans",
    category: "export",
    shortDesc: "Organic, high-protein beans for global markets.",
    fullDesc:
      "Our green mung beans are organically grown with high protein content, carefully sorted and graded to meet international export standards. These versatile legumes are in high demand across Asian markets for their nutritional value and culinary versatility.",
    specs: [
      "Protein Content: 24-26%",
      "Grade: Sorted & Graded",
      "Certification: Organic available",
      "Markets: Asia, Middle East",
    ],
    image: "/images/green_mung_beans_hd.png",
  },
  {
    id: "soya",
    title: "Soya Beans",
    category: "export",
    shortDesc: "Non-GMO soya from Ethiopia's fertile soils.",
    fullDesc:
      "Ethiopia's fertile soils produce exceptional non-GMO soya beans with superior nutritional profiles. Our soya beans are processed and packaged under strict quality control for international markets, ideal for food processing, animal feed, and oil extraction.",
    specs: [
      "Type: Non-GMO",
      "Protein: 36-40%",
      "Moisture: <13%",
      "Packaging: Customizable",
    ],
    image: "/images/soya_beans_hd.png",
  },
  {
    id: "peanuts",
    title: "Peanuts",
    category: "export",
    shortDesc: "Bold kernel peanuts with superior taste.",
    fullDesc:
      "Our bold kernel peanuts are sourced from select Ethiopian farms, known for their superior taste and satisfying crunch. Graded to international standards, they're perfect for snacking, confectionery, and oil extraction purposes.",
    specs: [
      "Type: Bold Kernel",
      "Grade: International Standard",
      "Moisture: <8%",
      "Use: Snacking, Confectionery, Oil",
    ],
    image: "/images/peanut_beans_hd.png",
  },
  {
    id: "castor",
    title: "Castor Seeds",
    category: "export",
    shortDesc: "Industrial-grade castor seeds for oil production.",
    fullDesc:
      "Ethiopian castor seeds are valued for their high oil content and industrial applications. From pharmaceuticals to cosmetics and industrial lubricants, our castor seeds meet the demanding specifications of global buyers.",
    specs: [
      "Oil Content: 45-55%",
      "Grade: Industrial Export",
      "Applications: Pharma, Cosmetics",
      "Packaging: 50kg bags",
    ],
    image: "/images/castor_seeds_hd.png",
  },
  {
    id: "pigeon-pea",
    title: "Pigeon Pea",
    category: "export",
    shortDesc: "Protein-rich red gram pulses for global tables.",
    fullDesc:
      "Ethiopian pigeon peas (Cajanus cajan), also known as red gram or toor dal, are sun-grown in warm lowland regions and prized for their rich, nutty flavor and high protein content. A staple pulse across Asia, Africa, and the Caribbean, our pigeon peas are cleaned, sorted, and graded to meet strict international standards — available as whole seeds or split for dal.",
    specs: [
      "Botanical Name: Cajanus cajan",
      "Protein Content: 20-22%",
      "Form: Whole seeds & split (dal)",
      "Markets: India, Africa, Caribbean",
    ],
    image: "/images/pigeon_pea.png",
  },
  {
    id: "polymer",
    title: "Polymer & Plastic Raw Materials",
    category: "import",
    shortDesc: "High-quality raw materials for manufacturing.",
    fullDesc:
      "We import premium polymer and plastic raw materials to serve Ethiopia's growing manufacturing sector. Our materials meet international quality specifications and are sourced from trusted global suppliers.",
    specs: [
      "Types: PP, PE, PVC, PET",
      "Grade: Industrial Standard",
      "Source: Global suppliers",
      "Delivery: Reliable logistics",
    ],
    image: "/images/polymer_and_plastic_raw_materials.png",
  },
  {
    id: "vehicles",
    title: "Vehicle Imports",
    category: "import",
    shortDesc: "BYD, Land Cruisers, and Sino trucks.",
    fullDesc:
      "From BYD electric vehicles and Toyota Land Cruisers to Sino heavy-duty trucks, we provide comprehensive vehicle import solutions for the Ethiopian market, ensuring quality and competitive pricing.",
    specs: [
      "Brands: BYD, Toyota, Sino",
      "Types: Cars, SUVs, Trucks",
      "Condition: Brand New",
      "Service: End-to-end import",
    ],
    image: "/images/vehicle_imports_hd.png",
  },
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<"all" | "export" | "import">("all");

  const filtered = products.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]" />
        <div className="absolute inset-0 ethiopian-pattern opacity-30" />
        <div
          className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-brand-500/10 to-transparent"
          style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto site-gutter">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] font-semibold text-brand-300 mb-6">
              <span className="w-12 h-[2px] bg-brand-400" />
              Our Products
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-4xl">
              Premium Products,{" "}
              <span className="text-brand-300">Global Standards</span>
            </h1>
            <p className="mt-6 font-body text-base text-white/75 max-w-2xl leading-relaxed">
              Discover our comprehensive range of export and import products,
              each meeting the highest international quality standards.
            </p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--background)]"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
        />
      </section>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto site-gutter">
          <Reveal>
            <div className="flex items-center justify-center gap-2 mb-16">
              {(["all", "export", "import"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={cn(
                    "px-6 py-2.5 font-body text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 cursor-pointer border",
                    filter === tab
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                      : "bg-transparent text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  )}
                >
                  {tab === "all" ? "All Products" : `${tab} Products`}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      "group relative cursor-pointer",
                      "bg-[var(--card)] border border-[var(--border)]",
                      "transition-all duration-500",
                      "hover:shadow-2xl hover:-translate-y-2 hover:border-[var(--primary)]"
                    )}
                  >
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={cn(
                          "px-3 py-1 font-body text-[10px] uppercase tracking-wider font-semibold",
                          product.category === "export"
                            ? "bg-brand-500 text-white"
                            : "bg-accent-500 text-white"
                        )}
                      >
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
                      <div className="absolute top-0 right-0 w-[90px] h-[2px] bg-[var(--primary)] origin-top-right rotate-[-45deg] translate-x-[15px] translate-y-[22px] transition-all duration-500 group-hover:w-[120px]" />
                    </div>

                    <div className="relative h-48 overflow-hidden bg-[var(--secondary)]">
                      <div className="absolute inset-0 flex items-center justify-center p-10">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={220}
                          height={170}
                          className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-5 flex flex-col gap-3">
                      <h3 className="font-heading text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
                        {product.shortDesc}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-[2px] w-0 bg-[var(--primary)] transition-all duration-500 group-hover:w-8" />
                        <span className="text-xs font-body uppercase tracking-wider text-[var(--primary)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--card)] border border-[var(--border)] shadow-2xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[var(--secondary)] hover:bg-[var(--accent)] hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto min-h-[280px] bg-[var(--secondary)]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain p-12"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={cn(
                        "px-3 py-1 font-body text-[10px] uppercase tracking-wider font-semibold",
                        selectedProduct.category === "export"
                          ? "bg-brand-500 text-white"
                          : "bg-accent-500 text-white"
                      )}
                    >
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 pr-14 md:pr-16 flex flex-col gap-5">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] mb-3">
                      {selectedProduct.title}
                    </h2>
                    <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {selectedProduct.fullDesc}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] font-semibold text-[var(--primary)] mb-3">
                      Specifications
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.specs.map((spec) => (
                        <li
                          key={spec}
                          className="flex items-start gap-2 font-body text-sm text-[var(--muted-foreground)]"
                        >
                          <span className="w-1.5 h-1.5 bg-[var(--primary)] rotate-45 mt-1.5 shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-2">
                    <Link href="/contact">
                      <Button variant="accent" className="w-full group">
                        Request a Quote
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]" />
        <div className="absolute inset-0 ethiopian-pattern opacity-20" />

        <div className="relative z-10 max-w-4xl mx-auto site-gutter text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
              Need a <span className="text-brand-300">Custom Order?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-body text-base text-white/75 max-w-xl mx-auto leading-relaxed">
              We accommodate custom quantities, packaging, and specifications.
              Contact us to discuss your requirements.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="group">
                  Get a Custom Quote
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
