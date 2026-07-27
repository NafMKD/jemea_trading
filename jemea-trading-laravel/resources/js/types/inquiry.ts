export type InquiryStatus = 'new' | 'read' | 'replied' | 'archived';

export type InquiryAssignee = {
    id: number;
    name: string;
    email?: string;
};

export type InquirySummary = {
    id: number;
    name: string;
    email: string;
    company: string | null;
    product_interest: string | null;
    status: InquiryStatus;
    created_at: string;
    assignee: InquiryAssignee | null;
};

export type InquiryDetail = InquirySummary & {
    message: string;
    source: string;
    email_sent_at: string | null;
    read_at: string | null;
    replied_at: string | null;
    updated_at: string;
};

export type InquiryStatusOption = {
    value: InquiryStatus;
    label: string;
};

export type PaginatedInquiries = {
    data: InquirySummary[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
};
