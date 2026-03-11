import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from './utils';

export function Tabs({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-tabs', className)} role="tablist" {...props} />;
}

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function Tab({ className, isActive = false, ...props }: TabProps) {
  return (
    <button className={cn('ui-tab', className)} role="tab" aria-selected={isActive} {...props} />
  );
}
