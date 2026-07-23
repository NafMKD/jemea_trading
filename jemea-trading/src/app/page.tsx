"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const products = [
  {
    title: "Ethiopian Coffee Beans",
    description:
      "Premium Arabica coffee beans sourced from the birthplace of coffee. Sun-dried and washed varieties from Sidamo, Yirgacheffe, and Harar regions.",
    image: "/images/coffee_beans_hd.png",
  },
  {
    title: "Sesame Seeds",
    description:
      "High-quality Humera and Wollega sesame seeds, prized globally for their rich oil content and distinctive nutty flavor profile.",
    image: "/images/sesame_seeds_hd.png",
  },
  {
    title: "Niger Seeds",
    description:
      "Ethiopian niger seeds (noug) with exceptional oil yield, cultivated in the highlands for purity and nutritional richness.",
    image: "/images/niger_seeds_hd.png",
  },
  {
    title: "Green Mung Beans",
    description:
      "Organic green mung beans with high protein content, carefully sorted and graded to meet international export standards.",
    image: "/images/green_mung_beans_hd.png",
  },
  {
    title: "Soya Beans",
    description:
      "Non-GMO soya beans from Ethiopia's fertile soils, processed and packaged for international markets with strict quality control.",
    image: "/images/soya_beans_hd.png",
  },
  {
    title: "Peanuts",
    description:
      "Bold kernel peanuts with superior taste and crunch. Sourced from select Ethiopian farms and graded to international standards.",
    image: "/images/peanut_beans_hd.png",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "30+", label: "Countries Served" },
  { value: "50K+", label: "Tons Exported" },
  { value: "100%", label: "Quality Certified" },
];

const highlights = [
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connecting Ethiopian agriculture to markets across Asia, Europe, the Middle East, and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Certified",
    description:
      "All products comply with international phytosanitary standards, packaging requirements, and certifications.",
  },
  {
    icon: Truck,
    title: "Reliable Logistics",
    description:
      "End-to-end supply chain management ensuring timely delivery to any port worldwide.",
  },
  {
    icon: Award,
    title: "Premium Grade",
    description:
      "Sourced directly from verified Ethiopian farmers and cooperatives for uncompromised quality.",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ position: "relative" }}
      >
        <div className="absolute inset-0 bg-[var(--hero-bg)]" />
        <div className="absolute inset-0 ethiopian-pattern opacity-40" />

        <div
          className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-brand-500/10 via-brand-600/5 to-transparent"
          style={{
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />

        <motion.div
          style={{ y: heroY }}
          className="absolute top-20 right-[15%] w-32 h-32 border border-brand-500/20 rotate-45 hidden lg:block"
        />
        <motion.div
          style={{ y: heroY }}
          className="absolute bottom-32 right-[25%] w-20 h-20 border border-brand-500/15 rotate-12 hidden lg:block"
        />
        <motion.div
          style={{ y: heroY }}
          className="absolute top-[40%] left-[8%] w-16 h-16 bg-brand-500/5 rotate-45 hidden lg:block"
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto site-gutter w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-12 h-[2px] bg-brand-400" />
                <span className="font-body text-xs uppercase tracking-[0.3em] text-brand-300 font-semibold">
                  Ethiopian Export Excellence
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight"
              >
                Global Trade.
                <br />
                <span className="text-brand-300">Local</span>{" "}
                Integrity.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 font-body text-base text-white/75 max-w-lg leading-relaxed"
              >
                Exporting Ethiopia&apos;s finest agricultural treasures &mdash;
                coffee, oil seeds, and premium crops &mdash; to discerning
                markets worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link href="/products">
                  <Button
                    variant="accent"
                    size="lg"
                    className="group"
                  >
                    Explore Products
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60"
                  >
                    Our Story
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-8"
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
                    <div className="font-body text-[11px] uppercase tracking-wider text-white/50 mt-1">
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
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="relative aspect-square">
                  <div className="absolute inset-8 border-2 border-brand-400/30 rotate-45" />
                  <div className="absolute inset-16 border border-brand-400/15 rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-72 relative">
                      <Image
                        src="/images/coffee_beans_hd.png"
                        alt="Ethiopian Coffee"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-24 h-24"
                >
                  <Image
                    src="/images/sesame_seeds_hd.png"
                    alt="Sesame Seeds"
                    fill
                    className="object-contain opacity-80"
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-6 -left-6 w-28 h-28"
                >
                  <Image
                    src="/images/peanut_beans_hd.png"
                    alt="Peanuts"
                    fill
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/45 text-[10px] uppercase tracking-[0.2em] font-body">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4 text-brand-400" />
          </motion.div>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--background)]"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
        />
      </section>

      {/* ===== HIGHLIGHTS SECTION ===== */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto site-gutter">
          <SectionHeading
            label="Why Choose Us"
            title="Built on Trust, Driven by Quality"
            subtitle="We bridge Ethiopian agricultural excellence with global markets through integrity, precision, and unwavering commitment to quality."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div
                  className={cn(
                    "group relative p-6 lg:p-7 border border-[var(--border)] bg-[var(--card)]",
                    "transition-all duration-500",
                    "hover:border-[var(--primary)] hover:shadow-xl hover:-translate-y-1"
                  )}
                >
                  <div className="absolute top-0 left-0 w-10 h-[2px] bg-[var(--primary)] transition-all duration-500 group-hover:w-full" />
                  <div className="absolute top-0 left-0 h-10 w-[2px] bg-[var(--primary)] transition-all duration-500 group-hover:h-full" />

                  <item.icon className="w-7 h-7 text-[var(--primary)] mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-bold mb-2 text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
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
        <div className="absolute inset-0 bg-[var(--hero-bg)] angle-cut-both" />
        <div className="absolute inset-0 ethiopian-pattern opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto site-gutter py-4">
          <SectionHeading
            label="Our Products"
            title="Ethiopia's Finest Exports"
            subtitle="From the highlands of Sidamo to the plains of Humera, we source only the finest agricultural products for the global market."
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Link href="/products">
                <Button
                  variant="accent"
                  size="lg"
                  className="group"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto site-gutter">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative p-4">
                <div className="relative aspect-[4/3] bg-[var(--secondary)] overflow-hidden">
                  <Image
                    src="/images/bag_of_peanut_coffe_seeds.png"
                    alt="Ethiopian Agricultural Products"
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2/5 h-2/5 bg-[var(--accent)]"
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                  >
                    <div className="absolute bottom-4 right-4 text-right">
                      <span className="font-heading text-3xl font-bold text-white">
                        15+
                      </span>
                      <span className="block text-[10px] uppercase tracking-wider text-white/80 font-body mt-0.5">
                        Years of Excellence
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-full h-full border-2 border-[var(--primary)] -z-10" />
              </div>
            </Reveal>

            <div>
              <Reveal direction="right">
                <span className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] font-semibold text-[var(--primary)] mb-4">
                  <span className="w-8 h-[2px] bg-[var(--primary)]" />
                  About Us
                </span>
              </Reveal>

              <Reveal direction="right" delay={0.1}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold leading-[1.15] text-[var(--foreground)] mb-5">
                  The Best of Ethiopia{" "}
                  <span className="text-[var(--primary)]">to the World</span>
                </h2>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p className="font-body text-base text-[var(--muted-foreground)] leading-relaxed mb-5">
                  Jemea Trading PLC is an Ethiopian-based import-export company
                  dedicated to bridging the gap between Ethiopia&apos;s rich
                  agricultural heritage and global markets. We supply high-grade
                  agricultural products sourced directly from verified farmers
                  and cooperatives.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <p className="font-body text-base text-[var(--muted-foreground)] leading-relaxed mb-6">
                  From exporting premium seeds, beans, and nuts to importing
                  high-quality industrial materials and vehicles &mdash; our
                  company delivers comprehensive trade solutions with integrity
                  and reliability.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <Link href="/about">
                  <Button variant="default" size="lg" className="group">
                    Read Our Story
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPORT SERVICES ===== */}
      <section className="relative py-20 md:py-28 bg-[var(--secondary)] ethiopian-pattern">
        <div className="max-w-7xl mx-auto site-gutter">
          <SectionHeading
            label="Import Solutions"
            title="Trusted Import & Export Solutions"
            subtitle="Beyond exports, we import high-quality polymer and plastic raw materials, as well as vehicles including Sinot trucks, BYD cars, and Toyota Land Cruisers."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Seeds, Beans & Nuts",
                desc: "Premium Ethiopian agricultural exports meeting international quality standards.",
                image: "/images/bag_of_peanut_coffe_seeds.png",
              },
              {
                title: "Polymer & Plastic Materials",
                desc: "High-quality raw materials for industrial and manufacturing needs.",
                image: "/images/polymer_and_plastic_raw_materials.png",
              },
              {
                title: "Vehicle Imports",
                desc: "BYD, Toyota Land Cruisers, and Sino trucks sourced for the Ethiopian market.",
                image: "/images/byd_land_cruiser_sino_truck_cars.png",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group relative bg-[var(--card)] border border-[var(--border)] overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-44 relative bg-[var(--muted)] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 pt-5 flex flex-col gap-2">
                    <h3 className="font-heading text-lg font-bold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--primary)] transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]" />
        <div className="absolute inset-0 ethiopian-pattern opacity-30" />

        <div className="absolute top-10 left-10 w-40 h-40 border border-brand-500/10 rotate-45 hidden lg:block" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-brand-500/10 rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-4xl mx-auto site-gutter text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] font-semibold text-brand-300 mb-6">
              <span className="w-8 h-[2px] bg-brand-400" />
              Start Trading
              <span className="w-8 h-[2px] bg-brand-400" />
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
              Ready to Source{" "}
              <span className="text-brand-300">Premium Ethiopian</span> Products?
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 font-body text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
              Choose the agricultural products you need and contact us — we ensure
              reliable, timely delivery wherever you are in the world.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="accent"
                  size="lg"
                  className="group"
                >
                  Contact Us Today
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
