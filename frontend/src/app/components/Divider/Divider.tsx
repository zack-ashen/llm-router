import React from 'react';

interface DividerProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className }: DividerProps, ref) => (
    <div
      ref={ref}
      className={`h-px w-full border border-grey-200 ${className}`}
    />
  )
);

Divider.displayName = 'Divider';

export default Divider;
