import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-lg text-sm font-body-medium ring-offset-grey-100 transition-colors focus-visible:outline-none focus-visible:ring-primary-200 focus-visible:ring-1 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-300 text-grey-100 hover:bg-primary-400 disabled:bg-primary-200",
        secondary: "bg-primary-100 text-primary-300 disabled:text-primary-200",
        destructive: "bg-state-error focus-visible:ring-state-error-foreground text-state-error-foreground",
        "destructive-secondary": "hover:bg-state-error focus-visible:ring-state-error text-state-error-foreground",
        tertiary: "text-grey-500 bg-grey-100 hover:bg-primary-100 hover:text-primary-300 focus-visible:ring-grey-300",
        "tertiary-outline":
          "text-grey-500 bg-grey-100 border border-grey-300 hover:border-primary-200 focus-visible:ring-grey-300",
        ghost: "text-grey-500 bg-grey-100 hover:bg-grey-300 focus-visible:ring-grey-300",
        "ghost-icon": "text-grey-500 bg-transparent focus-visible:ring-grey-100",
      },
      size: {
        default: "h-10 px-4 py-2.5",
        xs: "h-7 px-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        "icon-sm": "h-8 w-8",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
