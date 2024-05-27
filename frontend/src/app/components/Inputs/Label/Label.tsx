"use client";

import { cn } from "@/app/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva(
  "text-sm font-medium text-dark-grey leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { isRequired?: boolean }
>(({ className, isRequired, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    {children}
    {isRequired && (
      <span aria-hidden="true" className="text-red-500 ml-1">
        *
      </span>
    )}
  </LabelPrimitive.Root>
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
