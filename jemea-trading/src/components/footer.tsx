import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-coffee-950 text-coffee-100 mt-0">
      {/* Angular top edge */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[var(--background)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-8 h-8 bg-gold-500 rotate-45" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-coffee-100 rotate-45 translate-x-1 -translate-y-1" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white">Jemea</span>
                <span className="block text-[9px] font-body uppercase tracking-[0.3em] text-coffee-300 -mt-1">
                  Trading PLC
                </span>
              </div>
            </div>
            <p className="text-coffee-300 text-sm leading-relaxed max-w-xs">
              Exporting Ethiopia&apos;s finest agricultural products to the world. 
              Quality, reliability, and integrity in every shipment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gold-500" />
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
                    className="text-coffee-300 hover:text-gold-400 transition-colors duration-200 text-sm font-body uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gold-500" />
              Products
            </h4>
            <ul className="space-y-3">
              {["Ethiopian Coffee", "Sesame Seeds", "Niger Seeds", "Soya Beans", "Peanuts", "Castor Seeds"].map(
                (product) => (
                  <li key={product}>
                    <Link
                      href="/products"
                      className="text-coffee-300 hover:text-gold-400 transition-colors duration-200 text-sm font-body"
                    >
                      {product}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gold-500" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-coffee-300 text-sm leading-relaxed">
                  Arada Sub City, Woreda 01, Somali Tera,<br />
                  Beto Building, Office 316,<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+251900076995" className="text-coffee-300 hover:text-gold-400 transition-colors text-sm">
                  +251 900 076 995
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+251911205118" className="text-coffee-300 hover:text-gold-400 transition-colors text-sm">
                  +251 911 205 118
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:Jemeaplc@gmail.com" className="text-coffee-300 hover:text-gold-400 transition-colors text-sm">
                  Jemeaplc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-coffee-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-coffee-400 text-xs font-body tracking-wider">
            &copy; {new Date().getFullYear()} Jemea Trading PLC. All rights reserved.
          </p>
          <p className="text-coffee-500 text-xs font-body tracking-wider">
            Powered by <span className="text-gold-500">NafMKD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
