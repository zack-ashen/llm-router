"use client";

import { cn } from "@/app/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ThreeDots } from "react-loader-spinner";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg flex flex-row gap-3 text-sm font-medium transition-all input-focus",
  {
    variants: {
      variant: {
        primary:
          "[&:not(:hover)]:bg-primary-gradient inset-shadow-primary text-white shadow-sm hover:bg-gradient-to-b from-primary-400 via-primary-500 to-primary-500 border border-primary-dark ease-in-out duration-300",
        secondary:
          "bg-white text-grey-800 shadow-sm border border-grey-200 hover:shadow-smInset",
        tertiary:
          "bg-transparent border-none hover:bg-grey-200 hover:text-accent-foreground text-grey-800 inset-shadow-none hover:inset-shadow-transparent hover:border hover:border-grey-100",
        ghost: "bg-transparent border-none text-grey-800 inset-shadow-none",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-500/80 border border-red-600",
        link: "text-primary-900 underline-offset-4 hover:underline p-0",
      },
      width: {
        default: "w-auto",
        full: "w-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      loading,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <ThreeDots
            visible={true}
            height="24"
            width="24"
            color={variant === "primary" ? "#fff" : "#313149"}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
