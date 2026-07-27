export function AdminPageHeading({
    eyebrow,
    title,
    description,
    action,
}: {
    eyebrow: string;
    title: string;
    description: string;
    action?: React.ReactNode;
}) {
    return (
        <header className="relative overflow-hidden border-b border-slate-700 bg-[var(--hero-bg)] px-4 py-8 text-white md:px-8 md:py-10">
            <div
                className="ethiopian-pattern absolute inset-0 opacity-50"
                aria-hidden="true"
            />
            <div
                className="absolute -top-16 right-8 size-48 rotate-45 border border-brand-400/20"
                aria-hidden="true"
            />
            <div className="relative mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-brand-300 uppercase">
                        <span className="h-px w-8 bg-brand-400" />
                        {eyebrow}
                    </p>
                    <h1 className="font-heading text-3xl font-semibold text-balance md:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-pretty text-slate-300">
                        {description}
                    </p>
                </div>
                {action}
            </div>
        </header>
    );
}
