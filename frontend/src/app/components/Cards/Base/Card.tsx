"use client";

import { cn } from "@/app/utils";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  navigateTo?: string;
  withShadow?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      withShadow,
      clickable,
      navigateTo,
      onClick,
      ...props
    }: CardProps,
    ref
  ) => {
    const { push } = useRouter();

    const handleClick = useCallback(
      (
        e:
          | React.MouseEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLDivElement>
      ) => {
        if (onClick) {
          onClick(e as React.MouseEvent<HTMLDivElement>);
        }
        if (navigateTo) {
          push(navigateTo);
        }
      },
      [onClick, navigateTo, push]
    );

    return (
      <div
        ref={ref}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter") {
                  handleClick(e);
                }
              }
            : undefined
        }
        onClick={handleClick}
        tabIndex={clickable ? 0 : undefined}
        className={cn(
          "z-10 rounded-lg border border-grey-200 bg-white transition-all",
          withShadow && "shadow-sm",
          clickable &&
            "cursor-pointer hover:border hover:border-grey-300 hover:shadow-sm focus:bg-blue-50 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export default Card;
