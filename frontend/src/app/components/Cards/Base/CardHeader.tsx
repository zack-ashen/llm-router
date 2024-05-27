import { cn } from "@/app/utils";
import React from "react";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export default CardHeader;
