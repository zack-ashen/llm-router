import * as React from "react";

import { cva } from "class-variance-authority";
import { cn } from "../../../utils";

const textInputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium placeholder:font-normal placeholder:text-light-grey focus:border focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-50/50 disabled:cursor-not-allowed",
  {
    variants: {
      error: {
        true: "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400",
      },
      valid: {
        true: "border-green-500 focus:outline-none ring-2 ring-green-300 focus:ring-2 focus:ring-green-300 focus:border-success",
      },
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  valid?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, valid, ...props }, ref) => {
    if (valid && error) {
      valid = false;
    }

    return (
      <input
        type={type}
        className={cn(textInputVariants({ error, valid, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

export { TextInput };
