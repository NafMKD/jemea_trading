import { Sun, Moon } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <button
            type="button"
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            className={cn(
                'relative flex h-10 w-10 items-center justify-center',
                'border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]',
                'cursor-pointer transition-all duration-200',
                'group hover:shadow-md',
            )}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <Sun
                className={cn(
                    'h-[18px] w-[18px] transition-all duration-300',
                    isDark
                        ? 'scale-100 rotate-0 opacity-100'
                        : 'scale-0 -rotate-90 opacity-0',
                )}
            />
            <Moon
                className={cn(
                    'absolute h-[18px] w-[18px] transition-all duration-300',
                    isDark
                        ? 'scale-0 rotate-90 opacity-0'
                        : 'scale-100 rotate-0 opacity-100',
                )}
            />
        </button>
    );
}
