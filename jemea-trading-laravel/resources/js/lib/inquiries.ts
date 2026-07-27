import type { InquiryStatus } from '@/types';

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
    new: 'New',
    read: 'Read',
    replied: 'Replied',
    archived: 'Archived',
};

export function formatDate(
    value: string | null,
    options: Intl.DateTimeFormatOptions = {
        dateStyle: 'medium',
        timeStyle: 'short',
    },
): string {
    if (!value) {
        return 'Not recorded';
    }

    return new Intl.DateTimeFormat(undefined, options).format(new Date(value));
}

export function formatProductInterest(value: string | null): string {
    if (!value) {
        return 'General inquiry';
    }

    return value
        .split(/[-_]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}
