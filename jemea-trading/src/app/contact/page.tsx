"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "Arada Sub City, Woreda 01",
      "Somali Tera, Beto Building",
      "Office 316, Addis Ababa, Ethiopia",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+251 900 076 995", "+251 911 205 118"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@jemeatrading.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday - Friday: 9AM - 6PM", "Saturday: 9AM - 1PM (EAT)"],
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          product: data.get("product"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

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
              Get In Touch
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-4xl">
              Let&apos;s Build a{" "}
              <span className="text-brand-300">Partnership</span>
            </h1>
            <p className="mt-6 font-body text-base text-white/75 max-w-2xl leading-relaxed">
              Whether you&apos;re looking to source premium Ethiopian products or
              discuss import solutions, we&apos;re here to help.
            </p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--background)]"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
        />
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto site-gutter">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-3">
              <Reveal>
                <div className="bg-[var(--card)] border border-[var(--border)] p-8 md:p-12 relative">
                  <div className="absolute top-0 left-0 w-16 h-[2px] bg-[var(--primary)]" />
                  <div className="absolute top-0 left-0 h-16 w-[2px] bg-[var(--primary)]" />

                  <h2 className="font-heading text-2xl font-bold text-[var(--foreground)] mb-2">
                    Send Us a Message
                  </h2>
                  <p className="font-body text-sm text-[var(--muted-foreground)] mb-8">
                    Fill out the form below and we&apos;ll get back to you within 24
                    hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-body text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold mb-2"
                        >
                          Full Name <span className="text-[var(--destructive)]">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-body text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold mb-2"
                        >
                          Email <span className="text-[var(--destructive)]">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block font-body text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold mb-2"
                        >
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company"
                          autoComplete="organization"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="product"
                          className="block font-body text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold mb-2"
                        >
                          Product Interest
                        </label>
                        <select
                          id="product"
                          name="product"
                          className="flex h-12 w-full border-2 border-[var(--border)] bg-transparent px-4 py-2 font-body text-base text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)] cursor-pointer"
                        >
                          <option value="">Select a product</option>
                          <option value="coffee">Ethiopian Coffee</option>
                          <option value="sesame">Sesame Seeds</option>
                          <option value="niger">Niger Seeds</option>
                          <option value="mung">Green Mung Beans</option>
                          <option value="soya">Soya Beans</option>
                          <option value="peanuts">Peanuts</option>
                          <option value="castor">Castor Seeds</option>
                          <option value="polymer">Polymer Materials</option>
                          <option value="vehicles">Vehicle Imports</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-body text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold mb-2"
                      >
                        Message <span className="text-[var(--destructive)]">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about your requirements, quantities, and delivery preferences..."
                      />
                    </div>

                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-brand-50 border border-brand-200"
                      >
                        <CheckCircle className="w-5 h-5 text-brand-500 shrink-0" />
                        <p className="font-body text-sm text-brand-700">
                          Message sent successfully! We&apos;ll get back to you shortly.
                        </p>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="font-body text-sm text-red-700 dark:text-red-300">
                          {errorMessage || "Failed to send message. Please try again."}
                        </p>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.1} direction="right">
                    <div className="group p-6 border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--primary)]">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-[var(--primary)]/10 shrink-0">
                          <item.icon className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-bold text-[var(--foreground)] mb-1.5">
                            {item.title}
                          </h4>
                          {item.lines.map((line) => (
                            <p
                              key={line}
                              className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.4} direction="right">
                <div className="mt-6 relative h-48 bg-[var(--secondary)] border border-[var(--border)] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-[var(--primary)] mx-auto mb-2" />
                      <p className="font-body text-sm text-[var(--muted-foreground)]">
                        Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 ethiopian-pattern opacity-50" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ TEASER ===== */}
      <section className="py-20 md:py-28 bg-[var(--secondary)] ethiopian-pattern">
        <div className="max-w-4xl mx-auto site-gutter">
          <SectionHeading
            label="Common Questions"
            title="Frequently Asked"
          />

          <div className="space-y-4">
            {[
              {
                q: "What are your minimum order quantities?",
                a: "Minimum order quantities vary by product. Generally, we accommodate orders starting from one full container load (FCL). Contact us for specific MOQ details.",
              },
              {
                q: "Which countries do you export to?",
                a: "We export to over 30 countries across Asia, Europe, the Middle East, and Africa. We handle all documentation and logistics for smooth delivery.",
              },
              {
                q: "How do you ensure product quality?",
                a: "All products undergo rigorous quality inspection at multiple stages — from sourcing through processing and final export. We comply with international phytosanitary regulations and quality certifications.",
              },
              {
                q: "What payment terms do you offer?",
                a: "We offer flexible payment terms including L/C, T/T, and other negotiable terms depending on the order and client relationship. Discuss with our team for details.",
              },
            ].map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.08}>
                <details className="group bg-[var(--card)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--primary)]">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-heading text-base font-bold text-[var(--foreground)] list-none">
                    {faq.q}
                    <span className="ml-4 w-6 h-6 flex items-center justify-center bg-[var(--primary)]/10 shrink-0 transition-transform duration-300 group-open:rotate-45">
                      <span className="text-[var(--primary)] font-body text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
