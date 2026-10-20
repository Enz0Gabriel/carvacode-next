import * as React from "react";

import { cn } from "../../lib/utils";
import { fieldClassName } from "./input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return <textarea className={cn(fieldClassName, "min-h-32 resize-y", className)} ref={ref} {...props} />;
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
