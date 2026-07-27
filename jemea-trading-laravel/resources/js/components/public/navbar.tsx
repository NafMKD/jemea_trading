import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/public/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePage().url.split('?')[0];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-50 transition-shadow duration-300',
                'border-b border-[var(--border)] bg-white/98 backdrop-blur-md dark:bg-[var(--hero-deep)]/98',
                scrolled && 'shadow-md',
            )}
        >
            <nav className="site-gutter mx-auto w-full max-w-7xl">
                <div className="flex h-[4.25rem] items-center justify-between md:h-20">
                    <Link
                        href="/"
                        className="group flex min-w-0 shrink-0 items-center gap-3"
                    >
                        <img
                            src="/images/logo.jpg"
                            alt="Jemea Trading PLC"
                            width={140}
                            height={48}
                            className="h-10 w-auto object-contain object-left md:h-11"
                        />
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'relative cursor-pointer px-5 py-2 font-body text-sm tracking-[0.12em] uppercase transition-colors duration-200',
                                    pathname === link.href
                                        ? 'font-semibold text-[var(--primary)]'
                                        : 'text-[var(--foreground)] hover:text-[var(--primary)]',
                                )}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute right-4 bottom-0 left-4 h-0.5 bg-[var(--primary)]"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 35,
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link
                            href="/contact"
                            className="hidden min-h-10 cursor-pointer items-center justify-center bg-[var(--accent)] px-5 font-body text-xs font-semibold tracking-[0.12em] text-white uppercase transition-[background-color,opacity,box-shadow] duration-200 hover:opacity-90 hover:shadow-lg md:inline-flex"
                        >
                            Get a Quote
                        </Link>

                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center border border-[var(--border)] bg-white text-[var(--foreground)] md:hidden dark:bg-[var(--card)]"
                            aria-label={
                                mobileOpen
                                    ? 'Close navigation menu'
                                    : 'Open navigation menu'
                            }
                            aria-controls="mobile-navigation"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        id="mobile-navigation"
                        className="overflow-hidden border-t border-[var(--border)] bg-white md:hidden dark:bg-[var(--card)]"
                    >
                        <div className="site-gutter space-y-1 py-5">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            'block px-1 py-3 font-heading text-xl transition-colors duration-200',
                                            pathname === link.href
                                                ? 'font-semibold text-[var(--primary)]'
                                                : 'text-[var(--foreground)] hover:text-[var(--primary)]',
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.18 }}
                                className="pt-4"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex min-h-12 items-center justify-center bg-[var(--accent)] px-8 font-body text-sm font-semibold tracking-[0.12em] text-white uppercase"
                                >
                                    Get a Quote
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
