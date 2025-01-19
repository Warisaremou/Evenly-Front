import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-grey-300 bg-grey-100 px-3 py-2 text-sm hover:border-primary-200 ring-offset-grey-100 placeholder:text-grey-400 text-grey-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-200 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-grey-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
