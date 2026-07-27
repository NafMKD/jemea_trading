import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Archive,
    ArrowLeft,
    Building2,
    CalendarDays,
    Check,
    Mail,
    PackageSearch,
    Send,
    Trash2,
    UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { InquiryStatusBadge } from '@/components/admin/inquiry-status-badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    formatDate,
    formatProductInterest,
    inquiryStatusLabels,
} from '@/lib/inquiries';
import type {
    InquiryAssignee,
    InquiryDetail,
    InquiryStatus,
    InquiryStatusOption,
} from '@/types';

export default function InquiryShow({
    inquiry,
    statuses,
    assignees,
}: {
    inquiry: InquiryDetail;
    statuses: InquiryStatusOption[];
    assignees: InquiryAssignee[];
}) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const form = useForm({
        status: inquiry.status,
        assigned_to: inquiry.assignee?.id.toString() ?? '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch(`/admin/inquiries/${inquiry.id}`, {
            preserveScroll: true,
        });
    }

    function archiveInquiry() {
        router.patch(
            `/admin/inquiries/${inquiry.id}`,
            {
                status: 'archived',
                assigned_to: form.data.assigned_to || null,
            },
            { preserveScroll: true },
        );
    }

    function deleteInquiry() {
        router.delete(`/admin/inquiries/${inquiry.id}`, {
            onFinish: () => setDeleteOpen(false),
        });
    }

    const replyUrl = `mailto:${inquiry.email}?subject=${encodeURIComponent(
        `Re: Your inquiry to Jemea Trading PLC`,
    )}`;

    return (
        <>
            <Head title={`Inquiry from ${inquiry.name}`} />
            <AdminPageHeading
                eyebrow={`Inquiry #${inquiry.id}`}
                title={inquiry.name}
                description={`Received ${formatDate(inquiry.created_at)} · ${formatProductInterest(inquiry.product_interest)}`}
                action={
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-sm border-slate-500 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                        <Link href="/admin/inquiries">
                            <ArrowLeft aria-hidden="true" />
                            Back to Inquiries
                        </Link>
                    </Button>
                }
            />

            <div className="mx-auto grid w-full max-w-7xl gap-6 p-4 md:p-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="min-w-0 space-y-6">
                    <section
                        aria-labelledby="inquiry-message-heading"
                        className="overflow-hidden rounded-lg border bg-card shadow-sm"
                    >
                        <div className="flex flex-col gap-3 border-b px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase dark:text-brand-300">
                                    Customer Message
                                </p>
                                <h2
                                    id="inquiry-message-heading"
                                    className="mt-1 font-heading text-2xl font-semibold"
                                >
                                    Trade Request
                                </h2>
                            </div>
                            <InquiryStatusBadge status={inquiry.status} />
                        </div>
                        <div className="p-5 md:p-7">
                            <p className="text-sm leading-7 break-words whitespace-pre-wrap text-foreground">
                                {inquiry.message}
                            </p>
                        </div>
                    </section>

                    <section
                        aria-labelledby="contact-details-heading"
                        className="rounded-lg border bg-card p-5 shadow-sm md:p-6"
                    >
                        <h2
                            id="contact-details-heading"
                            className="font-heading text-2xl font-semibold"
                        >
                            Contact Details
                        </h2>
                        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                            <DetailItem
                                icon={UserRound}
                                label="Contact Name"
                                value={inquiry.name}
                            />
                            <DetailItem
                                icon={Mail}
                                label="Email Address"
                                value={inquiry.email}
                                href={`mailto:${inquiry.email}`}
                            />
                            <DetailItem
                                icon={Building2}
                                label="Company"
                                value={inquiry.company || 'Not provided'}
                            />
                            <DetailItem
                                icon={PackageSearch}
                                label="Product Interest"
                                value={formatProductInterest(
                                    inquiry.product_interest,
                                )}
                            />
                        </dl>
                    </section>

                    <section
                        aria-labelledby="activity-heading"
                        className="rounded-lg border bg-card p-5 shadow-sm md:p-6"
                    >
                        <h2
                            id="activity-heading"
                            className="font-heading text-2xl font-semibold"
                        >
                            Activity Record
                        </h2>
                        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                            <TimelineItem
                                icon={CalendarDays}
                                label="Received"
                                value={formatDate(inquiry.created_at)}
                            />
                            <TimelineItem
                                icon={Send}
                                label="Notification Sent"
                                value={formatDate(inquiry.email_sent_at)}
                            />
                            <TimelineItem
                                icon={Check}
                                label="Marked Read"
                                value={formatDate(inquiry.read_at)}
                            />
                            <TimelineItem
                                icon={Mail}
                                label="Marked Replied"
                                value={formatDate(inquiry.replied_at)}
                            />
                        </dl>
                    </section>
                </div>

                <aside className="space-y-6" aria-label="Inquiry management">
                    <form
                        onSubmit={submit}
                        className="rounded-lg border bg-card p-5 shadow-sm"
                    >
                        <p className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase dark:text-brand-300">
                            Workflow
                        </p>
                        <h2 className="mt-1 font-heading text-2xl font-semibold">
                            Manage Inquiry
                        </h2>

                        <div className="mt-5 space-y-4">
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
                                        form.setData(
                                            'status',
                                            event.target.value as InquiryStatus,
                                        )
                                    }
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                >
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
                                    htmlFor="assigned_to"
                                    className="mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                                >
                                    Assign To
                                </label>
                                <select
                                    id="assigned_to"
                                    name="assigned_to"
                                    value={form.data.assigned_to}
                                    onChange={(event) =>
                                        form.setData(
                                            'assigned_to',
                                            event.target.value,
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        form.errors.assigned_to,
                                    )}
                                    aria-describedby={
                                        form.errors.assigned_to
                                            ? 'assigned-to-error'
                                            : undefined
                                    }
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                >
                                    <option value="">Unassigned</option>
                                    {assignees.map((assignee) => (
                                        <option
                                            key={assignee.id}
                                            value={assignee.id}
                                        >
                                            {assignee.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.assigned_to && (
                                    <p
                                        id="assigned-to-error"
                                        className="mt-1 text-xs text-destructive"
                                        role="alert"
                                    >
                                        {form.errors.assigned_to}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.processing}
                            >
                                <Check aria-hidden="true" />
                                {form.processing
                                    ? 'Saving Changes…'
                                    : 'Save Changes'}
                            </Button>
                            <Button
                                asChild
                                type="button"
                                variant="outline"
                                className="w-full"
                            >
                                <a href={replyUrl}>
                                    <Mail aria-hidden="true" />
                                    Reply by Email
                                </a>
                            </Button>
                        </div>
                    </form>

                    <section className="rounded-lg border bg-card p-5 shadow-sm">
                        <h2 className="font-heading text-xl font-semibold">
                            Request Summary
                        </h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            <SummaryRow
                                label="Status"
                                value={inquiryStatusLabels[inquiry.status]}
                            />
                            <SummaryRow
                                label="Assigned To"
                                value={inquiry.assignee?.name || 'Unassigned'}
                            />
                            <SummaryRow label="Source" value={inquiry.source} />
                            <SummaryRow
                                label="Last Updated"
                                value={formatDate(inquiry.updated_at)}
                            />
                        </dl>
                    </section>

                    <section className="rounded-lg border border-destructive/30 bg-card p-5 shadow-sm">
                        <h2 className="font-heading text-xl font-semibold">
                            Record Actions
                        </h2>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Archive completed requests or permanently delete
                            records that should no longer be retained.
                        </p>
                        <div className="mt-4 grid gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={archiveInquiry}
                                disabled={inquiry.status === 'archived'}
                            >
                                <Archive aria-hidden="true" />
                                {inquiry.status === 'archived'
                                    ? 'Already Archived'
                                    : 'Archive Inquiry'}
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => setDeleteOpen(true)}
                            >
                                <Trash2 aria-hidden="true" />
                                Delete Permanently
                            </Button>
                        </div>
                    </section>
                </aside>
            </div>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="overscroll-contain">
                    <DialogHeader>
                        <DialogTitle>Delete This Inquiry?</DialogTitle>
                        <DialogDescription>
                            This permanently removes the request from{' '}
                            {inquiry.name}. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Keep Inquiry
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={deleteInquiry}
                        >
                            <Trash2 aria-hidden="true" />
                            Delete Inquiry
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function DetailItem({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
    href?: string;
}) {
    return (
        <div className="flex min-w-0 gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-medium break-words">
                    {href ? (
                        <a
                            href={href}
                            className="text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {value}
                        </a>
                    ) : (
                        value
                    )}
                </dd>
            </div>
        </div>
    );
}

function TimelineItem({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-md bg-secondary/50 p-3">
            <Icon
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
            />
            <div>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="max-w-40 text-right font-medium break-words">
                {value}
            </dd>
        </div>
    );
}

InquiryShow.layout = {
    breadcrumbs: [
        { title: 'Administration', href: '/admin' },
        { title: 'Inquiries', href: '/admin/inquiries' },
        { title: 'Inquiry Detail', href: '#' },
    ],
};
