import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-brand-500/30 bg-slate-950">
                <img
                    src="/images/logo.jpg"
                    alt=""
                    width="72"
                    height="54"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="ml-1 grid min-w-0 flex-1 text-left text-sm">
                <span className="mb-0.5 truncate font-heading text-base leading-tight font-semibold">
                    {name}
                </span>
                <span className="truncate text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Trade Operations
                </span>
            </div>
        </>
    );
}
