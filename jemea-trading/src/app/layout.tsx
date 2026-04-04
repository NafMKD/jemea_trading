import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jemea Trading PLC | Ethiopian Export Excellence",
  description:
    "Exporting Ethiopia's finest coffee, oil seeds, and agricultural products to the world. Quality, reliability, and global professionalism.",
  keywords: [
    "Ethiopian coffee",
    "export",
    "sesame seeds",
    "agricultural products",
    "Ethiopia",
    "trading",
    "oil seeds",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="min-h-screen font-body antialiased">
        <Providers>
          <div className="grain-overlay" aria-hidden="true" />
          <Navbar />
          <main className="min-h-[50vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
