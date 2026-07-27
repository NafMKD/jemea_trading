import { Footer } from '@/components/public/footer';
import { Navbar } from '@/components/public/navbar';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <a
                href="#main-content"
                className="fixed top-2 left-2 z-[10000] -translate-y-16 rounded-sm bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus-visible:translate-y-0"
            >
                Skip to Main Content
            </a>
            <div className="grain-overlay" aria-hidden="true" />
            <Navbar />
            <main id="main-content" className="min-h-[50vh]">
                {children}
            </main>
            <Footer />
        </div>
    );
}
