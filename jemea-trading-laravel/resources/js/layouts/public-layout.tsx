import { Footer } from '@/components/public/footer';
import { Navbar } from '@/components/public/navbar';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="grain-overlay" aria-hidden="true" />
            <Navbar />
            <main className="min-h-[50vh]">{children}</main>
            <Footer />
        </div>
    );
}
