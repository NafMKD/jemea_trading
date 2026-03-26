"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--background)]/95 backdrop-blur-md shadow-lg border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[var(--accent)] rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
              <div className="absolute inset-0 w-10 h-10 border-2 border-[var(--primary)] rotate-45 translate-x-1 -translate-y-1 transition-transform duration-300 group-hover:rotate-[135deg] group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold tracking-tight">
                Jemea
              </span>
              <span className="block text-[10px] font-body uppercase tracking-[0.3em] text-[var(--muted-foreground)] -mt-1">
                Trading PLC
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 font-body text-sm uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer",
                  pathname === link.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--foreground)] hover:text-[var(--accent)]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-5 right-5 h-[2px] bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center h-10 px-6 bg-[var(--accent)] text-[var(--accent-foreground)] font-body text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
            >
              Get a Quote
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-[var(--border)] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[var(--background)] border-b border-[var(--border)] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 font-heading text-2xl transition-colors duration-200",
                      pathname === link.href
                        ? "text-[var(--accent)]"
                        : "text-[var(--foreground)] hover:text-[var(--accent)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 px-8 bg-[var(--accent)] text-[var(--accent-foreground)] font-body text-sm uppercase tracking-[0.15em] font-semibold"
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
