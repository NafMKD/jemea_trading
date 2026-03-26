import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-sm font-semibold tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        accent:
          "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        outline:
          "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]",
        ghost:
          "text-[var(--foreground)] hover:bg-[var(--secondary)]",
        link:
          "text-[var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
