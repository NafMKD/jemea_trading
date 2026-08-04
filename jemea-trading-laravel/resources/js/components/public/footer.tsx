import { Link } from '@inertiajs/react';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative mt-0 bg-[var(--hero-deep)] text-slate-200">
            <div
                className="absolute top-0 right-0 left-0 h-12 bg-[var(--background)]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 100%)' }}
            />

            <div className="site-gutter mx-auto max-w-7xl pt-24 pb-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <img
                                src="/images/logo.jpg"
                                alt="Jemea Trading PLC"
                                width={160}
                                height={56}
                                className="h-11 w-auto max-w-[180px] object-contain object-left opacity-90"
                            />
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-white/70">
                            Exporting Ethiopia&apos;s finest agricultural
                            products to the world. Quality, reliability, and
                            integrity in every shipment.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-6 flex items-center gap-2 font-heading text-base font-semibold text-white">
                            <span className="h-[2px] w-6 bg-brand-500" />
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/about', label: 'About Us' },
                                { href: '/products', label: 'Products' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-body text-sm tracking-wider text-white/65 uppercase transition-colors duration-200 hover:text-brand-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 flex items-center gap-2 font-heading text-base font-semibold text-white">
                            <span className="h-[2px] w-6 bg-brand-500" />
                            Products
                        </h4>
                        <ul className="space-y-3">
                            {[
                                'Ethiopian Coffee',
                                'Sesame Seeds',
                                'Niger Seeds',
                                'Soya Beans',
                                'Peanuts',
                                'Castor Seeds',
                            ].map((product) => (
                                <li key={product}>
                                    <Link
                                        href="/products"
                                        className="font-body text-sm text-white/65 transition-colors duration-200 hover:text-brand-400"
                                    >
                                        {product}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 flex items-center gap-2 font-heading text-base font-semibold text-white">
                            <span className="h-[2px] w-6 bg-brand-500" />
                            Contact
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                                <span className="text-sm leading-relaxed text-white/65">
                                    Arada Sub City, Woreda 01, Somali Tera,
                                    <br />
                                    Beto Building, Office 316,
                                    <br />
                                    Addis Ababa, Ethiopia
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                                <a
                                    href="tel:+251900076995"
                                    className="text-sm text-white/65 transition-colors hover:text-brand-400"
                                >
                                    +251 900 076 995
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                                <a
                                    href="tel:+251911205118"
                                    className="text-sm text-white/65 transition-colors hover:text-brand-400"
                                >
                                    +251 911 205 118
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                                <a
                                    href="mailto:info@jemeatrading.com"
                                    className="text-sm text-white/65 transition-colors hover:text-brand-400"
                                >
                                    info@jemeatrading.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 md:flex-row">
                    <p className="font-body text-xs tracking-wider text-white/45">
                        &copy; {new Date().getFullYear()} Jemea Trading PLC. All
                        rights reserved.
                    </p>
                    <p className="font-body text-xs tracking-wider text-white/40">
                        Powered by{' '}
                        <span className="text-brand-400">NafMKD</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
