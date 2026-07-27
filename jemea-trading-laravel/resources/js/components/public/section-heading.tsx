import { Reveal } from '@/components/public/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    label?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    light?: boolean;
}

export function SectionHeading({
    label,
    title,
    subtitle,
    align = 'center',
    light = false,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                'mb-12 md:mb-16',
                align === 'center' && 'text-center',
            )}
        >
            {label && (
                <Reveal delay={0}>
                    <span
                        className={cn(
                            'mb-4 inline-flex items-center gap-3 font-body text-[11px] font-semibold tracking-[0.25em] uppercase',
                            light ? 'text-brand-300' : 'text-[var(--primary)]',
                        )}
                    >
                        <span
                            className={cn(
                                'h-[2px] w-8',
                                light ? 'bg-brand-400' : 'bg-[var(--primary)]',
                            )}
                        />
                        {label}
                        {align === 'center' && (
                            <span
                                className={cn(
                                    'h-[2px] w-8',
                                    light
                                        ? 'bg-brand-400'
                                        : 'bg-[var(--primary)]',
                                )}
                            />
                        )}
                    </span>
                </Reveal>
            )}
            <Reveal delay={0.1}>
                <h2
                    className={cn(
                        'font-heading text-3xl leading-[1.15] font-bold tracking-tight md:text-4xl lg:text-[2.75rem]',
                        light ? 'text-white' : 'text-[var(--foreground)]',
                    )}
                >
                    {title}
                </h2>
            </Reveal>
            {subtitle && (
                <Reveal delay={0.2}>
                    <p
                        className={cn(
                            'mt-4 max-w-2xl font-body text-base leading-relaxed',
                            align === 'center' && 'mx-auto',
                            light
                                ? 'text-white/75'
                                : 'text-[var(--muted-foreground)]',
                        )}
                    >
                        {subtitle}
                    </p>
                </Reveal>
            )}
        </div>
    );
}
