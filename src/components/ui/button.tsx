import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Use <Button> para ações da interface e `buttonVariants()` em <a> para navegação,
// e-mail, telefone e WhatsApp, mantendo a mesma aparência.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-center font-semibold leading-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Coral da marca com texto escuro (6,6:1).
        primary: "bg-brand-coral text-ink-950 hover:bg-brand-coral-hover",
        // Contorno para superfícies escuras.
        outlineDark: "border border-white/30 text-on-dark hover:border-white/50 hover:bg-white/10",
        // Contorno para superfícies claras.
        outline: "border border-line-strong text-fg hover:border-fg-muted hover:bg-surface-muted",
      },
      size: {
        sm: "min-h-10 px-4 py-2 text-sm",
        md: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
        lg: "min-h-12 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
