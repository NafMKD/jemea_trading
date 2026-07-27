import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Reveal } from '@/components/public/reveal';
import { SectionHeading } from '@/components/public/section-heading';
import { Button } from '@/components/public/ui/button';
import { Input } from '@/components/public/ui/input';
import { Textarea } from '@/components/public/ui/textarea';

type ContactForm = {
    name: string;
    email: string;
    company: string;
    product_interest: string;
    message: string;
    website: string;
};

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p
            className="mt-2 font-body text-xs text-[var(--destructive)]"
            role="alert"
        >
            {message}
        </p>
    );
}

const contactInfo = [
    {
        icon: MapPin,
        title: 'Visit Us',
        lines: [
            'Arada Sub City, Woreda 01',
            'Somali Tera, Beto Building',
            'Office 316, Addis Ababa, Ethiopia',
        ],
    },
    {
        icon: Phone,
        title: 'Call Us',
        lines: ['+251 900 076 995', '+251 911 205 118'],
    },
    {
        icon: Mail,
        title: 'Email Us',
        lines: ['Jemeaplc@gmail.com'],
    },
    {
        icon: Clock,
        title: 'Business Hours',
        lines: ['Monday - Friday: 9AM - 6PM', 'Saturday: 9AM - 1PM (EAT)'],
    },
];

export default function ContactPage({
    productInterest = null,
}: {
    productInterest?: string | null;
}) {
    const [sent, setSent] = useState(false);
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<ContactForm>({
            name: '',
            email: '',
            company: '',
            product_interest: productInterest ?? '',
            message: '',
            website: '',
        });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSent(false);
        clearErrors();

        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSent(true);
            },
            onError: () => {
                requestAnimationFrame(() => {
                    document
                        .querySelector<HTMLElement>('[aria-invalid="true"]')
                        ?.focus();
                });
            },
        });
    }

    return (
        <>
            <Head>
                <title>Contact Us | Jemea Trading PLC</title>
                <meta
                    name="description"
                    content="Contact Jemea Trading PLC about sourcing premium Ethiopian agricultural exports, import solutions, quantities, and delivery requirements."
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
                            Get In Touch
                        </span>
                        <h1 className="max-w-4xl font-heading text-4xl leading-[1.05] font-bold text-white md:text-5xl lg:text-6xl">
                            Let&apos;s Build a{' '}
                            <span className="text-brand-300">Partnership</span>
                        </h1>
                        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/75">
                            Whether you&apos;re looking to source premium
                            Ethiopian products or discuss import solutions,
                            we&apos;re here to help.
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

            {/* ===== CONTACT FORM + INFO ===== */}
            <section className="py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
                        <div className="lg:col-span-3">
                            <Reveal>
                                <div className="relative border border-[var(--border)] bg-[var(--card)] p-8 md:p-12">
                                    <div className="absolute top-0 left-0 h-[2px] w-16 bg-[var(--primary)]" />
                                    <div className="absolute top-0 left-0 h-16 w-[2px] bg-[var(--primary)]" />

                                    <h2 className="mb-2 font-heading text-2xl font-bold text-[var(--foreground)]">
                                        Send Us a Message
                                    </h2>
                                    <p className="mb-8 font-body text-sm text-[var(--muted-foreground)]">
                                        Fill out the form below and we&apos;ll
                                        get back to you within 24 hours.
                                    </p>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div
                                            className="absolute top-auto left-[-10000px] h-px w-px overflow-hidden"
                                            aria-hidden="true"
                                        >
                                            <label htmlFor="website">
                                                Website
                                            </label>
                                            <input
                                                id="website"
                                                name="website"
                                                type="text"
                                                value={data.website}
                                                onChange={(e) =>
                                                    setData(
                                                        'website',
                                                        e.target.value,
                                                    )
                                                }
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="mb-2 block font-body text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase"
                                                >
                                                    Full Name{' '}
                                                    <span className="text-[var(--destructive)]">
                                                        *
                                                    </span>
                                                </label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Your full name"
                                                    autoComplete="name"
                                                    aria-invalid={Boolean(
                                                        errors.name,
                                                    )}
                                                    aria-describedby={
                                                        errors.name
                                                            ? 'name-error'
                                                            : undefined
                                                    }
                                                />
                                                <div id="name-error">
                                                    <FieldError
                                                        message={errors.name}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-2 block font-body text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase"
                                                >
                                                    Email{' '}
                                                    <span className="text-[var(--destructive)]">
                                                        *
                                                    </span>
                                                </label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            'email',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="your@email.com"
                                                    autoComplete="email"
                                                    spellCheck={false}
                                                    aria-invalid={Boolean(
                                                        errors.email,
                                                    )}
                                                    aria-describedby={
                                                        errors.email
                                                            ? 'email-error'
                                                            : undefined
                                                    }
                                                />
                                                <div id="email-error">
                                                    <FieldError
                                                        message={errors.email}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="company"
                                                    className="mb-2 block font-body text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase"
                                                >
                                                    Company Name
                                                </label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    value={data.company}
                                                    onChange={(e) =>
                                                        setData(
                                                            'company',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Your company"
                                                    autoComplete="organization"
                                                    aria-invalid={Boolean(
                                                        errors.company,
                                                    )}
                                                    aria-describedby={
                                                        errors.company
                                                            ? 'company-error'
                                                            : undefined
                                                    }
                                                />
                                                <div id="company-error">
                                                    <FieldError
                                                        message={errors.company}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="product_interest"
                                                    className="mb-2 block font-body text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase"
                                                >
                                                    Product Interest
                                                </label>
                                                <select
                                                    id="product_interest"
                                                    name="product_interest"
                                                    value={
                                                        data.product_interest
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'product_interest',
                                                            e.target.value,
                                                        )
                                                    }
                                                    autoComplete="off"
                                                    className="flex h-12 w-full cursor-pointer border-2 border-[var(--border)] bg-[var(--background)] px-4 py-2 font-body text-base text-[var(--foreground)] transition-colors focus-visible:border-[var(--primary)] focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:outline-none"
                                                >
                                                    <option value="">
                                                        Select a product
                                                    </option>
                                                    <option value="coffee">
                                                        Ethiopian Coffee
                                                    </option>
                                                    <option value="sesame">
                                                        Sesame Seeds
                                                    </option>
                                                    <option value="niger">
                                                        Niger Seeds
                                                    </option>
                                                    <option value="mung">
                                                        Green Mung Beans
                                                    </option>
                                                    <option value="soya">
                                                        Soya Beans
                                                    </option>
                                                    <option value="peanuts">
                                                        Peanuts
                                                    </option>
                                                    <option value="castor">
                                                        Castor Seeds
                                                    </option>
                                                    <option value="pigeon-pea">
                                                        Pigeon Pea
                                                    </option>
                                                    <option value="polymer">
                                                        Polymer Materials
                                                    </option>
                                                    <option value="vehicles">
                                                        Vehicle Imports
                                                    </option>
                                                    <option value="other">
                                                        Other
                                                    </option>
                                                </select>
                                                <FieldError
                                                    message={
                                                        errors.product_interest
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="mb-2 block font-body text-xs font-semibold tracking-wider text-[var(--foreground)] uppercase"
                                            >
                                                Message{' '}
                                                <span className="text-[var(--destructive)]">
                                                    *
                                                </span>
                                            </label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        'message',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Tell us about quantities, packaging, and delivery…"
                                                autoComplete="off"
                                                aria-invalid={Boolean(
                                                    errors.message,
                                                )}
                                                aria-describedby={
                                                    errors.message
                                                        ? 'message-error'
                                                        : undefined
                                                }
                                            />
                                            <div id="message-error">
                                                <FieldError
                                                    message={errors.message}
                                                />
                                            </div>
                                        </div>

                                        {sent && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 border border-brand-200 bg-brand-50 p-4"
                                                role="status"
                                                aria-live="polite"
                                            >
                                                <CheckCircle
                                                    className="h-5 w-5 shrink-0 text-brand-500"
                                                    aria-hidden="true"
                                                />
                                                <p className="font-body text-sm text-brand-700">
                                                    Message sent successfully!
                                                    We&apos;ll get back to you
                                                    shortly.
                                                </p>
                                            </motion.div>
                                        )}

                                        {Object.keys(errors).length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/30"
                                                role="alert"
                                            >
                                                <AlertCircle
                                                    className="h-5 w-5 shrink-0 text-red-500"
                                                    aria-hidden="true"
                                                />
                                                <p className="font-body text-sm text-red-700 dark:text-red-300">
                                                    Please review the
                                                    highlighted fields and try
                                                    again.
                                                </p>
                                            </motion.div>
                                        )}

                                        <Button
                                            type="submit"
                                            variant="accent"
                                            size="lg"
                                            disabled={processing}
                                            className="w-full sm:w-auto"
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2
                                                        className="h-4 w-4 animate-spin"
                                                        aria-hidden="true"
                                                    />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    <Send
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
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
                                    <Reveal
                                        key={item.title}
                                        delay={i * 0.1}
                                        direction="right"
                                    >
                                        <div className="group border border-[var(--border)] bg-[var(--card)] p-6 transition-[border-color] duration-300 hover:border-[var(--primary)]">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--primary)]/10">
                                                    <item.icon className="h-5 w-5 text-[var(--primary)]" />
                                                </div>
                                                <div>
                                                    <h4 className="mb-1.5 font-heading text-base font-bold text-[var(--foreground)]">
                                                        {item.title}
                                                    </h4>
                                                    {item.lines.map((line) => (
                                                        <p
                                                            key={line}
                                                            className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]"
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
                                <div className="relative mt-6 h-48 overflow-hidden border border-[var(--border)] bg-[var(--secondary)]">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="mx-auto mb-2 h-8 w-8 text-[var(--primary)]" />
                                            <p className="font-body text-sm text-[var(--muted-foreground)]">
                                                Addis Ababa, Ethiopia
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ethiopian-pattern absolute inset-0 opacity-50" />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ TEASER ===== */}
            <section className="ethiopian-pattern bg-[var(--secondary)] py-20 md:py-28">
                <div className="site-gutter mx-auto max-w-4xl">
                    <SectionHeading
                        label="Common Questions"
                        title="Frequently Asked"
                    />

                    <div className="space-y-4">
                        {[
                            {
                                q: 'What are your minimum order quantities?',
                                a: 'Minimum order quantities vary by product. Generally, we accommodate orders starting from one full container load (FCL). Contact us for specific MOQ details.',
                            },
                            {
                                q: 'Which countries do you export to?',
                                a: 'We export to over 30 countries across Asia, Europe, the Middle East, and Africa. We handle all documentation and logistics for smooth delivery.',
                            },
                            {
                                q: 'How do you ensure product quality?',
                                a: 'All products undergo rigorous quality inspection at multiple stages — from sourcing through processing and final export. We comply with international phytosanitary regulations and quality certifications.',
                            },
                            {
                                q: 'What payment terms do you offer?',
                                a: 'We offer flexible payment terms including L/C, T/T, and other negotiable terms depending on the order and client relationship. Discuss with our team for details.',
                            },
                        ].map((faq, i) => (
                            <Reveal key={faq.q} delay={i * 0.08}>
                                <details className="group border border-[var(--border)] bg-[var(--card)] transition-[border-color] duration-300 hover:border-[var(--primary)]">
                                    <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-heading text-base font-bold text-[var(--foreground)]">
                                        {faq.q}
                                        <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--primary)]/10 transition-transform duration-300 group-open:rotate-45">
                                            <span className="font-body text-lg leading-none text-[var(--primary)]">
                                                +
                                            </span>
                                        </span>
                                    </summary>
                                    <div className="px-5 pb-5">
                                        <p className="font-body text-sm leading-relaxed text-[var(--muted-foreground)]">
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
