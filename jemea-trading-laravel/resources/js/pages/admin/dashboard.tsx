import { Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { dashboard } from '@/routes';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Administration" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Jemea Trading PLC
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Administration
                    </h1>
                </div>

                <section className="flex max-w-2xl items-start gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                    <span className="rounded-lg bg-primary/10 p-3 text-primary">
                        <ShieldCheck className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                        <h2 className="font-semibold">Foundation ready</h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            Authentication and administrator authorization are
                            active. Inquiry statistics and management tools will
                            be added in the contact-management phases.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Administration',
            href: dashboard(),
        },
    ],
};
