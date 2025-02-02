import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border transition-all border-grey-300 bg-grey-100 px-3 py-2 text-sm hover:border-primary-200 ring-offset-grey-100 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-grey-500 placeholder:text-grey-400 text-grey-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-200 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-80 disabled:text-grey-500 disabled:hover:border-grey-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
