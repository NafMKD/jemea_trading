import { Head, router, useForm } from '@inertiajs/react';
import {
    BellRing,
    CheckCircle2,
    KeyRound,
    LoaderCircle,
    MailCheck,
    Send,
    ServerCog,
    ShieldCheck,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type EmailSettings = {
    notifications_enabled: boolean;
    smtp_host: string;
    smtp_port: number;
    smtp_username: string | null;
    smtp_encryption: 'none' | 'tls' | 'ssl';
    from_address: string;
    from_name: string;
    notification_email: string;
    has_password: boolean;
    is_persisted: boolean;
};

export default function EmailNotifications({
    settings,
    errors = {},
}: {
    settings: EmailSettings;
    errors?: { test_email?: string };
}) {
    const [testing, setTesting] = useState(false);
    const form = useForm({
        notifications_enabled: settings.notifications_enabled,
        smtp_host: settings.smtp_host,
        smtp_port: settings.smtp_port,
        smtp_username: settings.smtp_username ?? '',
        smtp_password: '',
        clear_password: false,
        smtp_encryption: settings.smtp_encryption,
        from_address: settings.from_address,
        from_name: settings.from_name,
        notification_email: settings.notification_email,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.patch('/settings/email-notifications', {
            preserveScroll: true,
            onSuccess: () => {
                form.setData('smtp_password', '');
                form.setData('clear_password', false);
            },
        });
    }

    function sendTestEmail() {
        setTesting(true);
        router.post(
            '/settings/email-notifications/test',
            {},
            {
                preserveScroll: true,
                onFinish: () => setTesting(false),
            },
        );
    }

    return (
        <>
            <Head title="Email notification settings" />
            <h1 className="sr-only">Email Notification Settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Email Notifications"
                    description="Control inquiry alerts and the SMTP connection used to deliver them."
                />

                <div
                    className={cn(
                        'relative overflow-hidden rounded-lg border p-5',
                        form.data.notifications_enabled
                            ? 'border-brand-300 bg-brand-50 dark:border-brand-700 dark:bg-brand-900/30'
                            : 'border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-900/40',
                    )}
                >
                    <div
                        className="ethiopian-pattern absolute inset-0 opacity-30"
                        aria-hidden="true"
                    />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <span
                                className={cn(
                                    'flex size-10 shrink-0 items-center justify-center rounded-md',
                                    form.data.notifications_enabled
                                        ? 'bg-brand-500 text-white'
                                        : 'bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
                                )}
                            >
                                <BellRing
                                    className="size-5"
                                    aria-hidden="true"
                                />
                            </span>
                            <div>
                                <p className="font-heading text-xl font-semibold">
                                    Inquiry Email Alerts
                                </p>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    {form.data.notifications_enabled
                                        ? 'New inquiries will be stored and queued for email delivery.'
                                        : 'Inquiries will still be stored, but no notification emails will be queued.'}
                                </p>
                            </div>
                        </div>
                        <label
                            htmlFor="notifications_enabled"
                            className="flex cursor-pointer items-center gap-3 self-start rounded-md border bg-background px-4 py-3 sm:self-auto"
                        >
                            <Checkbox
                                id="notifications_enabled"
                                checked={form.data.notifications_enabled}
                                onCheckedChange={(checked) =>
                                    form.setData(
                                        'notifications_enabled',
                                        checked === true,
                                    )
                                }
                            />
                            <span className="text-sm font-semibold">
                                {form.data.notifications_enabled
                                    ? 'Notifications On'
                                    : 'Notifications Off'}
                            </span>
                        </label>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <SettingsCard
                        icon={ServerCog}
                        eyebrow="Connection"
                        title="SMTP Server"
                        description="Enter the outgoing mail server supplied by your email provider."
                    >
                        <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
                            <Field
                                id="smtp_host"
                                label="SMTP Host"
                                error={form.errors.smtp_host}
                            >
                                <Input
                                    id="smtp_host"
                                    name="smtp_host"
                                    value={form.data.smtp_host}
                                    onChange={(event) =>
                                        form.setData(
                                            'smtp_host',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="smtp.example.com"
                                    autoComplete="off"
                                    aria-invalid={Boolean(
                                        form.errors.smtp_host,
                                    )}
                                />
                            </Field>
                            <Field
                                id="smtp_port"
                                label="Port"
                                error={form.errors.smtp_port}
                            >
                                <Input
                                    id="smtp_port"
                                    name="smtp_port"
                                    type="number"
                                    min={1}
                                    max={65535}
                                    inputMode="numeric"
                                    value={form.data.smtp_port}
                                    onChange={(event) =>
                                        form.setData(
                                            'smtp_port',
                                            Number(event.target.value),
                                        )
                                    }
                                    aria-invalid={Boolean(
                                        form.errors.smtp_port,
                                    )}
                                />
                            </Field>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                id="smtp_username"
                                label="Username"
                                error={form.errors.smtp_username}
                            >
                                <Input
                                    id="smtp_username"
                                    name="smtp_username"
                                    value={form.data.smtp_username}
                                    onChange={(event) =>
                                        form.setData(
                                            'smtp_username',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="SMTP account username"
                                    autoComplete="off"
                                    spellCheck={false}
                                    aria-invalid={Boolean(
                                        form.errors.smtp_username,
                                    )}
                                />
                            </Field>
                            <Field
                                id="smtp_encryption"
                                label="Encryption"
                                error={form.errors.smtp_encryption}
                            >
                                <select
                                    id="smtp_encryption"
                                    name="smtp_encryption"
                                    value={form.data.smtp_encryption}
                                    onChange={(event) =>
                                        form.setData(
                                            'smtp_encryption',
                                            event.target.value as
                                                'none' | 'tls' | 'ssl',
                                        )
                                    }
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                >
                                    <option value="tls">TLS / STARTTLS</option>
                                    <option value="ssl">SSL</option>
                                    <option value="none">
                                        None — Not Recommended
                                    </option>
                                </select>
                            </Field>
                        </div>

                        <Field
                            id="smtp_password"
                            label="Password"
                            error={form.errors.smtp_password}
                            hint={
                                settings.has_password
                                    ? 'An encrypted password is stored. Leave this blank to keep it unchanged.'
                                    : 'The password is encrypted before it is stored.'
                            }
                        >
                            <div className="relative">
                                <KeyRound
                                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <Input
                                    id="smtp_password"
                                    name="smtp_password"
                                    type="password"
                                    value={form.data.smtp_password}
                                    onChange={(event) =>
                                        form.setData(
                                            'smtp_password',
                                            event.target.value,
                                        )
                                    }
                                    placeholder={
                                        settings.has_password
                                            ? 'Leave blank to keep the stored password'
                                            : 'Enter the SMTP password'
                                    }
                                    autoComplete="new-password"
                                    spellCheck={false}
                                    className="pl-9"
                                    disabled={form.data.clear_password}
                                    aria-invalid={Boolean(
                                        form.errors.smtp_password,
                                    )}
                                />
                            </div>
                            {settings.has_password && (
                                <label
                                    htmlFor="clear_password"
                                    className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground"
                                >
                                    <Checkbox
                                        id="clear_password"
                                        checked={form.data.clear_password}
                                        onCheckedChange={(checked) =>
                                            form.setData(
                                                'clear_password',
                                                checked === true,
                                            )
                                        }
                                    />
                                    Remove the stored password
                                </label>
                            )}
                        </Field>
                    </SettingsCard>

                    <SettingsCard
                        icon={MailCheck}
                        eyebrow="Delivery"
                        title="Sender & Destination"
                        description="Choose the identity used for outgoing mail and where inquiry alerts should arrive."
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                id="from_name"
                                label="From Name"
                                error={form.errors.from_name}
                            >
                                <Input
                                    id="from_name"
                                    name="from_name"
                                    value={form.data.from_name}
                                    onChange={(event) =>
                                        form.setData(
                                            'from_name',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Jemea Trading PLC"
                                    autoComplete="organization"
                                    aria-invalid={Boolean(
                                        form.errors.from_name,
                                    )}
                                />
                            </Field>
                            <Field
                                id="from_address"
                                label="From Email"
                                error={form.errors.from_address}
                            >
                                <Input
                                    id="from_address"
                                    name="from_address"
                                    type="email"
                                    value={form.data.from_address}
                                    onChange={(event) =>
                                        form.setData(
                                            'from_address',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="notifications@example.com"
                                    autoComplete="email"
                                    spellCheck={false}
                                    aria-invalid={Boolean(
                                        form.errors.from_address,
                                    )}
                                />
                            </Field>
                        </div>

                        <Field
                            id="notification_email"
                            label="Notification Destination"
                            error={form.errors.notification_email}
                            hint="Every new inquiry alert will be sent to this address."
                        >
                            <Input
                                id="notification_email"
                                name="notification_email"
                                type="email"
                                value={form.data.notification_email}
                                onChange={(event) =>
                                    form.setData(
                                        'notification_email',
                                        event.target.value,
                                    )
                                }
                                placeholder="admin@example.com"
                                autoComplete="email"
                                spellCheck={false}
                                aria-invalid={Boolean(
                                    form.errors.notification_email,
                                )}
                            />
                        </Field>
                    </SettingsCard>

                    <div className="flex flex-col gap-3 rounded-lg border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <ShieldCheck
                                className="mt-0.5 size-5 shrink-0 text-primary"
                                aria-hidden="true"
                            />
                            <div>
                                <p className="text-sm font-semibold">
                                    Credentials Are Encrypted
                                </p>
                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    SMTP passwords are never returned to the
                                    browser after saving.
                                </p>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={form.processing}
                            className="sm:min-w-40"
                        >
                            {form.processing ? (
                                <LoaderCircle
                                    className="animate-spin"
                                    aria-hidden="true"
                                />
                            ) : (
                                <CheckCircle2 aria-hidden="true" />
                            )}
                            {form.processing
                                ? 'Saving Settings…'
                                : 'Save Settings'}
                        </Button>
                    </div>
                </form>

                <div className="rounded-lg border border-dashed bg-secondary/40 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-heading text-lg font-semibold">
                                Test SMTP Delivery
                            </p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Save changes first, then send a test message to
                                the configured notification destination.
                            </p>
                            {errors.test_email && (
                                <p
                                    className="mt-2 text-xs text-destructive"
                                    role="alert"
                                >
                                    {errors.test_email}
                                </p>
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={sendTestEmail}
                            disabled={testing || !settings.is_persisted}
                        >
                            {testing ? (
                                <LoaderCircle
                                    className="animate-spin"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Send aria-hidden="true" />
                            )}
                            {testing ? 'Sending Test…' : 'Send Test Email'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

function SettingsCard({
    icon: Icon,
    eyebrow,
    title,
    description,
    children,
}: {
    icon: typeof ServerCog;
    eyebrow: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b bg-secondary/40 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
                        {eyebrow}
                    </p>
                    <h2 className="mt-0.5 font-heading text-xl font-semibold">
                        {title}
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
            <div className="space-y-5 p-5">{children}</div>
        </section>
    );
}

function Field({
    id,
    label,
    hint,
    error,
    children,
}: {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <div className="mt-2">{children}</div>
            {hint && !error && (
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    {hint}
                </p>
            )}
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-xs text-destructive"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

EmailNotifications.layout = {
    breadcrumbs: [
        {
            title: 'Email notification settings',
            href: '/settings/email-notifications',
        },
    ],
};
