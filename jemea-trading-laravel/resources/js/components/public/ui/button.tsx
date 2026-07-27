import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex cursor-pointer items-center justify-center gap-2 font-body text-sm font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl',
                accent: 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-lg hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl',
                outline:
                    'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]',
                ghost: 'text-[var(--foreground)] hover:bg-[var(--secondary)]',
                link: 'text-[var(--accent)] underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-8 py-2',
                sm: 'h-9 px-5 text-xs',
                lg: 'h-14 px-12 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
