import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Filter,
    Inbox,
    RotateCcw,
    Search,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { InquiryStatusBadge } from '@/components/admin/inquiry-status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate, formatProductInterest } from '@/lib/inquiries';
import type { InquiryStatusOption, PaginatedInquiries } from '@/types';

type InquiryFilters = {
    search?: string | null;
    status?: string | null;
    product_interest?: string | null;
    date_from?: string | null;
    date_to?: string | null;
    sort?: 'newest' | 'oldest';
};

export default function InquiryIndex({
    inquiries,
    filters,
    statuses,
    productInterests,
}: {
    inquiries: PaginatedInquiries;
    filters: InquiryFilters;
    statuses: InquiryStatusOption[];
    productInterests: string[];
}) {
    const form = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
        product_interest: filters.product_interest ?? '',
        date_from: filters.date_from ?? '',
        date_to: filters.date_to ?? '',
        sort: filters.sort ?? 'newest',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.get('/admin/inquiries', {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    function clearFilters() {
        form.reset();
        router.get(
            '/admin/inquiries',
            {},
            { preserveScroll: true, replace: true },
        );
    }

    const hasFilters = Boolean(
        filters.search ||
        filters.status ||
        filters.product_interest ||
        filters.date_from ||
        filters.date_to ||
        filters.sort === 'oldest',
    );

    return (
        <>
            <Head title="Contact Inquiries" />
            <AdminPageHeading
                eyebrow="Lead Management"
                title="Contact Inquiries"
                description="Search, prioritize, assign, and follow every request received through the public website."
            />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-8">
                <form
                    onSubmit={submit}
                    className="rounded-lg border bg-card p-4 shadow-sm md:p-5"
                    aria-label="Filter inquiries"
                >
                    <div className="mb-4 flex items-center gap-2">
                        <Filter
                            className="size-4 text-primary"
                            aria-hidden="true"
                        />
                        <h2 className="font-heading text-lg font-semibold">
                            Filter Requests
                        </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                        <div className="md:col-span-2 xl:col-span-2">
                            <label
                                htmlFor="search"
                                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <Search
                                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <Input
                                    id="search"
                                    name="search"
                                    value={form.data.search}
                                    onChange={(event) =>
                                        form.setData(
                                            'search',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Name, email, company, or message…"
                                    autoComplete="off"
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={form.data.status}
                                onChange={(event) =>
                                    form.setData('status', event.target.value)
                                }
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                            >
                                <option value="">All Statuses</option>
                                {statuses.map((status) => (
                                    <option
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="product_interest"
                                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                            >
                                Product
                            </label>
                            <select
                                id="product_interest"
                                name="product_interest"
                                value={form.data.product_interest}
                                onChange={(event) =>
                                    form.setData(
                                        'product_interest',
                                        event.target.value,
                                    )
                                }
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                            >
                                <option value="">All Products</option>
                                {productInterests.map((product) => (
                                    <option key={product} value={product}>
                                        {formatProductInterest(product)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="date_from"
                                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                            >
                                From
                            </label>
                            <Input
                                id="date_from"
                                name="date_from"
                                type="date"
                                value={form.data.date_from}
                                onChange={(event) =>
                                    form.setData(
                                        'date_from',
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="date_to"
                                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                            >
                                To
                            </label>
                            <Input
                                id="date_to"
                                name="date_to"
                                type="date"
                                value={form.data.date_to}
                                onChange={(event) =>
                                    form.setData('date_to', event.target.value)
                                }
                                aria-invalid={Boolean(form.errors.date_to)}
                                aria-describedby={
                                    form.errors.date_to
                                        ? 'date-to-error'
                                        : undefined
                                }
                            />
                            {form.errors.date_to && (
                                <p
                                    id="date-to-error"
                                    className="mt-1 text-xs text-destructive"
                                    role="alert"
                                >
                                    {form.errors.date_to}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="w-full sm:w-48">
                            <label
                                htmlFor="sort"
                                className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                            >
                                Sort
                            </label>
                            <select
                                id="sort"
                                name="sort"
                                value={form.data.sort}
                                onChange={(event) =>
                                    form.setData(
                                        'sort',
                                        event.target.value as
                                            'newest' | 'oldest',
                                    )
                                }
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            {hasFilters && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={clearFilters}
                                >
                                    <RotateCcw aria-hidden="true" />
                                    Clear Filters
                                </Button>
                            )}
                            <Button type="submit" disabled={form.processing}>
                                <Search aria-hidden="true" />
                                {form.processing
                                    ? 'Applying Filters…'
                                    : 'Apply Filters'}
                            </Button>
                        </div>
                    </div>
                </form>

                <section
                    aria-labelledby="inquiry-results-heading"
                    className="overflow-hidden rounded-lg border bg-card shadow-sm"
                >
                    <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
                        <div>
                            <h2
                                id="inquiry-results-heading"
                                className="font-heading text-xl font-semibold"
                            >
                                Inquiry Results
                            </h2>
                            <p
                                className="mt-0.5 text-xs text-muted-foreground tabular-nums"
                                aria-live="polite"
                            >
                                {inquiries.total === 0
                                    ? 'No matching inquiries'
                                    : `Showing ${inquiries.from}–${inquiries.to} of ${inquiries.total}`}
                            </p>
                        </div>
                    </div>

                    {inquiries.data.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                                <Inbox className="size-5" aria-hidden="true" />
                            </span>
                            <h3 className="mt-4 font-heading text-xl font-semibold">
                                No Matching Inquiries
                            </h3>
                            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                                Adjust or clear the filters to see more contact
                                requests.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto lg:block">
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
                                                Company
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                Product
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
                                                Assigned
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                Received
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-5 py-3"
                                            >
                                                <span className="sr-only">
                                                    Open
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {inquiries.data.map((inquiry) => (
                                            <tr
                                                key={inquiry.id}
                                                className="hover:bg-secondary/40"
                                            >
                                                <td className="max-w-60 px-5 py-4">
                                                    <p className="truncate font-semibold">
                                                        {inquiry.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {inquiry.email}
                                                    </p>
                                                </td>
                                                <td className="max-w-48 px-5 py-4">
                                                    <span className="block truncate text-muted-foreground">
                                                        {inquiry.company || '—'}
                                                    </span>
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
                                                <td className="max-w-40 px-5 py-4">
                                                    <span className="block truncate text-muted-foreground">
                                                        {inquiry.assignee
                                                            ?.name ||
                                                            'Unassigned'}
                                                    </span>
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
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <Link
                                                            href={`/admin/inquiries/${inquiry.id}`}
                                                            aria-label={`Open inquiry from ${inquiry.name}`}
                                                        >
                                                            <ArrowRight aria-hidden="true" />
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid gap-3 p-3 sm:grid-cols-2 lg:hidden">
                                {inquiries.data.map((inquiry) => (
                                    <Link
                                        key={inquiry.id}
                                        href={`/admin/inquiries/${inquiry.id}`}
                                        className="min-w-0 rounded-md border bg-background p-4 hover:border-brand-400 hover:bg-secondary/30 focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold">
                                                    {inquiry.name}
                                                </p>
                                                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                                    {inquiry.email}
                                                </p>
                                            </div>
                                            <InquiryStatusBadge
                                                status={inquiry.status}
                                            />
                                        </div>
                                        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <dt className="text-muted-foreground">
                                                    Product
                                                </dt>
                                                <dd className="mt-1 font-medium">
                                                    {formatProductInterest(
                                                        inquiry.product_interest,
                                                    )}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-muted-foreground">
                                                    Received
                                                </dt>
                                                <dd className="mt-1 font-medium">
                                                    {formatDate(
                                                        inquiry.created_at,
                                                        {
                                                            dateStyle: 'medium',
                                                        },
                                                    )}
                                                </dd>
                                            </div>
                                        </dl>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {inquiries.last_page > 1 && (
                        <nav
                            className="flex items-center justify-between gap-4 border-t px-5 py-4"
                            aria-label="Inquiry pagination"
                        >
                            {inquiries.prev_page_url ? (
                                <Button asChild variant="outline" size="sm">
                                    <Link
                                        href={inquiries.prev_page_url}
                                        preserveScroll
                                    >
                                        <ArrowLeft aria-hidden="true" />
                                        Previous
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="outline" size="sm" disabled>
                                    <ArrowLeft aria-hidden="true" />
                                    Previous
                                </Button>
                            )}
                            <p className="text-xs text-muted-foreground tabular-nums">
                                Page {inquiries.current_page} of{' '}
                                {inquiries.last_page}
                            </p>
                            {inquiries.next_page_url ? (
                                <Button asChild variant="outline" size="sm">
                                    <Link
                                        href={inquiries.next_page_url}
                                        preserveScroll
                                    >
                                        Next
                                        <ArrowRight aria-hidden="true" />
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                    <ArrowRight aria-hidden="true" />
                                </Button>
                            )}
                        </nav>
                    )}
                </section>
            </div>
        </>
    );
}

InquiryIndex.layout = {
    breadcrumbs: [
        { title: 'Administration', href: '/admin' },
        { title: 'Inquiries', href: '/admin/inquiries' },
    ],
};
