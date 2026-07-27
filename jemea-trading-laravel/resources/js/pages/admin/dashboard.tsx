import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarDays,
    Inbox,
    MailOpen,
    Sparkles,
} from 'lucide-react';
import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { InquiryStatusBadge } from '@/components/admin/inquiry-status-badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatProductInterest } from '@/lib/inquiries';
import { dashboard } from '@/routes';
import type { InquirySummary } from '@/types';

type DashboardStats = {
    total: number;
    new: number;
    last_7_days: number;
    last_30_days: number;
};

const numberFormatter = new Intl.NumberFormat();

export default function AdminDashboard({
    stats,
    recentInquiries,
}: {
    stats: DashboardStats;
    recentInquiries: InquirySummary[];
}) {
    const statCards = [
        {
            label: 'Total Inquiries',
            value: stats.total,
            note: 'All website requests',
            icon: Inbox,
            accent: 'bg-brand-500',
        },
        {
            label: 'New Inquiries',
            value: stats.new,
            note: 'Awaiting review',
            icon: Sparkles,
            accent: 'bg-accent-500',
        },
        {
            label: 'Last 7 Days',
            value: stats.last_7_days,
            note: 'Recent activity',
            icon: MailOpen,
            accent: 'bg-emerald-500',
        },
        {
            label: 'Last 30 Days',
            value: stats.last_30_days,
            note: 'Monthly volume',
            icon: CalendarDays,
            accent: 'bg-slate-500',
        },
    ];

    return (
        <>
            <Head title="Administration" />
            <AdminPageHeading
                eyebrow="Operations Overview"
                title="Inquiry Command Center"
                description="Track new trade opportunities, review recent requests, and keep every prospective customer moving forward."
                action={
                    <Button
                        asChild
                        className="rounded-sm bg-accent-500 font-semibold text-white shadow-lg shadow-black/20 hover:bg-accent-600"
                    >
                        <Link href="/admin/inquiries">
                            Manage Inquiries
                            <ArrowRight aria-hidden="true" />
                        </Link>
                    </Button>
                }
            />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 md:p-8">
                <section aria-labelledby="inquiry-overview-heading">
                    <h2 id="inquiry-overview-heading" className="sr-only">
                        Inquiry Overview
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.label}
                                    className="relative overflow-hidden rounded-lg border bg-card p-5 shadow-sm"
                                >
                                    <span
                                        className={`absolute inset-x-0 top-0 h-1 ${card.accent}`}
                                        aria-hidden="true"
                                    />
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                                                {card.label}
                                            </p>
                                            <p className="mt-3 font-heading text-4xl leading-none font-semibold tabular-nums">
                                                {numberFormatter.format(
                                                    card.value,
                                                )}
                                            </p>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                {card.note}
                                            </p>
                                        </div>
                                        <span className="rounded-md bg-secondary p-2.5 text-primary">
                                            <Icon
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section
                    aria-labelledby="recent-inquiries-heading"
                    className="overflow-hidden rounded-lg border bg-card shadow-sm"
                >
                    <div className="flex flex-col gap-3 border-b px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase dark:text-brand-300">
                                Latest Activity
                            </p>
                            <h2
                                id="recent-inquiries-heading"
                                className="mt-1 font-heading text-2xl font-semibold"
                            >
                                Recent Inquiries
                            </h2>
                        </div>
                        <Link
                            href="/admin/inquiries"
                            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            View All Inquiries
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>

                    {recentInquiries.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                                <Inbox className="size-5" aria-hidden="true" />
                            </span>
                            <h3 className="mt-4 font-heading text-xl font-semibold">
                                No Inquiries Yet
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                New contact requests will appear here.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-secondary/70 text-xs tracking-[0.08em] text-muted-foreground uppercase">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                Contact
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                Interest
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                Received
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3 text-right"
                                            >
                                                <span className="sr-only">
                                                    Open
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {recentInquiries.map((inquiry) => (
                                            <tr
                                                key={inquiry.id}
                                                className="hover:bg-secondary/40"
                                            >
                                                <td className="max-w-64 px-5 py-4">
                                                    <p className="truncate font-semibold">
                                                        {inquiry.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {inquiry.email}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-4 text-muted-foreground">
                                                    {formatProductInterest(
                                                        inquiry.product_interest,
                                                    )}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <InquiryStatusBadge
                                                        status={inquiry.status}
                                                    />
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                                                    {formatDate(
                                                        inquiry.created_at,
                                                        {
                                                            dateStyle: 'medium',
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <Link
                                                        href={`/admin/inquiries/${inquiry.id}`}
                                                        aria-label={`Open inquiry from ${inquiry.name}`}
                                                        className="inline-flex rounded-sm p-2 text-primary hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-brand-900/30"
                                                    >
                                                        <ArrowRight
                                                            className="size-4"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y md:hidden">
                                {recentInquiries.map((inquiry) => (
                                    <Link
                                        key={inquiry.id}
                                        href={`/admin/inquiries/${inquiry.id}`}
                                        className="block p-5 hover:bg-secondary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold">
                                                    {inquiry.name}
                                                </p>
                                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                                    {formatProductInterest(
                                                        inquiry.product_interest,
                                                    )}
                                                </p>
                                            </div>
                                            <InquiryStatusBadge
                                                status={inquiry.status}
                                            />
                                        </div>
                                        <p className="mt-3 text-xs text-muted-foreground">
                                            {formatDate(inquiry.created_at)}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
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
