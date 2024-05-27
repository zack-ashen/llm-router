import { cn } from "@/app/utils";
import React from "react";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-medium-grey", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export default CardDescription;
