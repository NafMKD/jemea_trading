import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[var(--hero-deep)] text-slate-200 mt-0">
      <div className="absolute top-0 left-0 right-0 h-12 bg-[var(--background)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }} />

      <div className="max-w-7xl mx-auto site-gutter pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logo.jpg"
                alt="Jemea Trading PLC"
                width={160}
                height={56}
                className="h-11 w-auto max-w-[180px] object-contain object-left opacity-90"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Exporting Ethiopia&apos;s finest agricultural products to the world.
              Quality, reliability, and integrity in every shipment.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-500" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-brand-400 transition-colors duration-200 text-sm font-body uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-500" />
              Products
            </h4>
            <ul className="space-y-3">
              {["Ethiopian Coffee", "Sesame Seeds", "Niger Seeds", "Soya Beans", "Peanuts", "Castor Seeds"].map(
                (product) => (
                  <li key={product}>
                    <Link
                      href="/products"
                      className="text-white/65 hover:text-brand-400 transition-colors duration-200 text-sm font-body"
                    >
                      {product}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-500" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span className="text-white/65 text-sm leading-relaxed">
                  Arada Sub City, Woreda 01, Somali Tera,<br />
                  Beto Building, Office 316,<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+251900076995" className="text-white/65 hover:text-brand-400 transition-colors text-sm">
                  +251 900 076 995
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+251911205118" className="text-white/65 hover:text-brand-400 transition-colors text-sm">
                  +251 911 205 118
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:info@jemeatrading.com" className="text-white/65 hover:text-brand-400 transition-colors text-sm">
                  info@jemeatrading.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/45 text-xs font-body tracking-wider">
            &copy; {new Date().getFullYear()} Jemea Trading PLC. All rights reserved.
          </p>
          <p className="text-white/40 text-xs font-body tracking-wider">
            Powered by <span className="text-brand-400">NafMKD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
