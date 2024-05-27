import React from "react";

export interface NavigationBarProps {
  leftElement?: React.ReactNode;
  centerElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export const NavigationBar = ({
  leftElement,
  centerElement,
  rightElement,
  className,
}: NavigationBarProps) => {
  return (
    <nav
      className={`${className} w-full px-12 h-16 min-h-16 flex items-center bg-white border-b border-grey-200`}
    >
      <div className="flex flex-1 justify-start">{leftElement || <div />}</div>
      <div className="flex-2 justify-center items-center mx-auto">{centerElement}</div>
      <div className="flex flex-1 justify-end">{rightElement || <div />}</div>
    </nav>
  );
};
