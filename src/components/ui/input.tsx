import * as React from "react";

import { cn } from "../../lib/utils";

// Classe compartilhada por input, select e textarea do formulário.
// Texto em 16px evita o zoom automático do iOS ao focar o campo.
export const fieldClassName =
  "block w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-base text-fg placeholder:text-fg-muted transition-colors hover:border-fg-muted focus-visible:border-brand-blue-ink focus-visible:outline-2 focus-visible:outline-offset-1 aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:opacity-60";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return <input type={type} className={cn(fieldClassName, className)} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };
