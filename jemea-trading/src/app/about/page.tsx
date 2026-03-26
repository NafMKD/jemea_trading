"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We conduct every transaction with honesty, transparency, and respect for all partners in our supply chain.",
  },
  {
    icon: Target,
    title: "Quality First",
    description:
      "From farm to shipment, we maintain rigorous quality control ensuring every product meets international standards.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Supporting Ethiopian farmers and cooperatives through fair trade practices and sustainable agricultural methods.",
  },
  {
    icon: Eye,
    title: "Reliability",
    description:
      "Consistent delivery timelines and open communication throughout the entire export process.",
  },
];

const timeline = [
  {
    year: "Founded",
    title: "The Journey Begins",
    desc: "Jemea Trading PLC was established in Addis Ababa with a vision to connect Ethiopian agriculture with the global market.",
  },
  {
    year: "Growth",
    title: "Expanding Horizons",
    desc: "Expanded our export portfolio to include coffee, sesame, niger seeds, soya beans, peanuts, and castor seeds.",
  },
  {
    year: "Global",
    title: "International Recognition",
    desc: "Reached over 30 countries, establishing trusted partnerships across Asia, Europe, and the Middle East.",
  },
  {
    year: "Today",
    title: "Comprehensive Trade Solutions",
    desc: "Now offering both import and export services — from agricultural exports to vehicle and raw material imports.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-coffee-950" />
        <div className="absolute inset-0 ethiopian-pattern opacity-30" />
        <div
          className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-gold-500/8 to-transparent"
          style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] font-semibold text-gold-400 mb-6">
              <span className="w-12 h-[2px] bg-gold-500" />
              Our Story
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-4xl">
              Rooted in Ethiopia,{" "}
              <span className="text-gold-400">Reaching the World</span>
            </h1>
            <p className="mt-6 font-body text-base text-coffee-300 max-w-2xl leading-relaxed">
              For over fifteen years, Jemea Trading PLC has been the bridge
              between Ethiopia&apos;s rich agricultural heritage and global markets
              that value quality, authenticity, and trust.
            </p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--background)]"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
        />
      </section>

      {/* ===== COMPANY STORY ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] font-semibold text-[var(--accent)] mb-4">
                  <span className="w-8 h-[2px] bg-[var(--accent)]" />
                  Who We Are
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold leading-[1.15] text-[var(--foreground)] mb-6">
                  The Dynamic Duo Behind{" "}
                  <span className="text-[var(--accent)]">the Plow</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-body text-base text-[var(--muted-foreground)] leading-relaxed mb-5">
                  Jemea Trading PLC was born from a passion for Ethiopian
                  agriculture and a determination to showcase its potential on
                  the global stage. Based in the heart of Addis Ababa, we have
                  built a reputation for integrity, quality, and reliability in
                  international trade.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="font-body text-base text-[var(--muted-foreground)] leading-relaxed mb-5">
                  We supply high-grade agricultural products sourced directly
                  from verified Ethiopian farmers and cooperatives. All products
                  follow international quality standards, packaging requirements,
                  and phytosanitary regulations. Our commitment extends beyond
                  profit — we believe in empowering the communities that grow
                  these exceptional products.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="font-body text-base text-[var(--muted-foreground)] leading-relaxed">
                  From the fragrant coffee highlands of Sidamo and Yirgacheffe
                  to the sesame fields of Humera, we curate Ethiopia&apos;s
                  agricultural wealth and deliver it to the world with care and
                  precision.
                </p>
              </Reveal>
            </div>

            <Reveal direction="right">
              <div className="relative p-4">
                <div className="aspect-[3/4] bg-[var(--secondary)] relative overflow-hidden">
                  <Image
                    src="/images/top_view_of_addis_ababa.png"
                    alt="Addis Ababa, Ethiopia"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 w-36 h-36 bg-[var(--accent)] flex items-center justify-center z-10">
                  <div className="text-center">
                    <span className="font-heading text-3xl font-bold text-white block">15+</span>
                    <span className="font-body text-[10px] uppercase tracking-wider text-white/80">
                      Years in Trade
                    </span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-full h-full border-2 border-[var(--accent)] -z-10" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-coffee-950 angle-cut-both" />
        <div className="absolute inset-0 ethiopian-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
              <div className="p-8 md:p-10 border border-gold-500/20 bg-coffee-900/50 backdrop-blur-sm">
                <div className="w-11 h-11 flex items-center justify-center bg-gold-500/10 mb-5">
                  <Target className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Our Mission
                </h3>
                <p className="font-body text-base text-coffee-300 leading-relaxed">
                  To be Ethiopia&apos;s most trusted agricultural export partner
                  by delivering premium-quality products with uncompromising
                  standards, fostering sustainable farming practices, and
                  building lasting relationships with international buyers who
                  share our commitment to excellence.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-8 md:p-10 border border-gold-500/20 bg-coffee-900/50 backdrop-blur-sm">
                <div className="w-11 h-11 flex items-center justify-center bg-gold-500/10 mb-5">
                  <Eye className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Our Vision
                </h3>
                <p className="font-body text-base text-coffee-300 leading-relaxed">
                  To position Ethiopian agricultural products as the gold
                  standard in global trade. We envision a future where every
                  buyer worldwide recognizes Ethiopia not just as the birthplace
                  of coffee, but as the source of the world&apos;s finest seeds,
                  beans, and agricultural exports.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title="What Drives Us Forward"
            subtitle="The principles that guide every decision, every partnership, and every shipment."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <div
                  className={cn(
                    "group relative p-6 lg:p-7 border border-[var(--border)] bg-[var(--card)]",
                    "transition-all duration-500",
                    "hover:border-[var(--accent)] hover:shadow-xl hover:-translate-y-1"
                  )}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[90px] h-[2px] bg-[var(--accent)] origin-top-right rotate-[-45deg] translate-x-[15px] translate-y-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <value.icon className="w-7 h-7 text-[var(--accent)] mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-bold mb-2 text-[var(--foreground)]">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20 md:py-28 bg-[var(--secondary)] ethiopian-pattern">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Journey"
            title="Milestones That Define Us"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border)] -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div
                    className={cn(
                      "relative flex items-start gap-8",
                      "md:gap-16",
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[var(--accent)] rotate-45 -translate-x-1/2 z-10 mt-2" />

                    {/* Content */}
                    <div
                      className={cn(
                        "ml-16 md:ml-0 md:w-[calc(50%-3rem)]",
                        i % 2 === 0 ? "md:text-right" : "md:text-left"
                      )}
                    >
                      <span className="font-body text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
                        {item.year}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-[var(--foreground)] mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
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
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-[1.15]">
              Partner with Ethiopia&apos;s{" "}
              <span className="text-[var(--accent)]">Trusted Exporters</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 font-body text-base text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re sourcing premium coffee beans, oil seeds, or any of
              our agricultural products, we&apos;re ready to serve you with
              excellence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="group">
                  Get In Touch
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
