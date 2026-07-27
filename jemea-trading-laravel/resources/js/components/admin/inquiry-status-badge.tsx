import { Circle, CircleCheck, MailCheck, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InquiryStatus } from '@/types';

const statusConfig = {
    new: {
        label: 'New',
        icon: Circle,
        className:
            'border-accent-300 bg-accent-50 text-accent-700 dark:border-accent-700/70 dark:bg-accent-900/30 dark:text-accent-200',
    },
    read: {
        label: 'Read',
        icon: CircleCheck,
        className:
            'border-brand-300 bg-brand-50 text-brand-800 dark:border-brand-700 dark:bg-brand-900/30 dark:text-brand-200',
    },
    replied: {
        label: 'Replied',
        icon: MailCheck,
        className:
            'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200',
    },
    archived: {
        label: 'Archived',
        icon: PackageCheck,
        className:
            'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
    },
} satisfies Record<
    InquiryStatus,
    { label: string; icon: typeof Circle; className: string }
>;

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span
            className={cn(
                'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
                config.className,
            )}
        >
            <Icon className="size-3" aria-hidden="true" />
            {config.label}
        </span>
    );
}
