"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-shadow duration-300",
        "bg-white/98 dark:bg-[var(--hero-deep)]/98 backdrop-blur-md border-b border-[var(--border)]",
        scrolled && "shadow-md"
      )}
    >
      <nav className="max-w-7xl mx-auto w-full site-gutter">
        <div className="flex items-center justify-between h-[4.25rem] md:h-20">
          <Link href="/" className="group flex items-center gap-3 min-w-0 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Jemea Trading PLC"
              width={140}
              height={48}
              className="h-10 md:h-11 w-auto object-contain object-left"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 font-body text-sm uppercase tracking-[0.12em] transition-colors duration-200 cursor-pointer",
                  pathname === link.href
                    ? "text-[var(--primary)] font-semibold"
                    : "text-[var(--foreground)] hover:text-[var(--primary)]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--primary)]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center min-h-10 px-5 bg-[var(--accent)] text-white font-body text-xs uppercase tracking-[0.12em] font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
            >
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden min-h-10 min-w-10 flex items-center justify-center border border-[var(--border)] bg-white dark:bg-[var(--card)] text-[var(--foreground)] cursor-pointer"
              aria-label="Toggle menu"
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-[var(--border)] bg-white dark:bg-[var(--card)] overflow-hidden"
          >
            <div className="site-gutter py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 px-1 font-heading text-xl transition-colors duration-200",
                      pathname === link.href
                        ? "text-[var(--primary)] font-semibold"
                        : "text-[var(--foreground)] hover:text-[var(--primary)]"
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
                  className="inline-flex items-center justify-center min-h-12 px-8 bg-[var(--accent)] text-white font-body text-sm uppercase tracking-[0.12em] font-semibold"
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
