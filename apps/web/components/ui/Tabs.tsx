'use client';

import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cn } from './utils';

export function getNextTabIndex(
  currentIndex: number,
  tabCount: number,
  key: string,
): number | null {
  if (tabCount < 1) {
    return null;
  }

  if (key === 'ArrowRight') {
    return (currentIndex + 1) % tabCount;
  }

  if (key === 'ArrowLeft') {
    return (currentIndex - 1 + tabCount) % tabCount;
  }

  if (key === 'Home') {
    return 0;
  }

  if (key === 'End') {
    return tabCount - 1;
  }

  return null;
}

export function Tabs({ className, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('ui-tabs', className)}
      role="tablist"
      onKeyDown={(event) => {
        onKeyDown?.(event);

        const currentTab = event.target;
        if (!(currentTab instanceof HTMLButtonElement)) {
          return;
        }

        const tabElements = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
        );
        const currentIndex = tabElements.indexOf(currentTab);
        const nextIndex = getNextTabIndex(currentIndex, tabElements.length, event.key);

        if (nextIndex === null) {
          return;
        }

        event.preventDefault();
        tabElements[nextIndex]?.focus();
      }}
      {...props}
    />
  );
}

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function Tab({ className, isActive = false, ...props }: TabProps) {
  return (
    <button className={cn('ui-tab', className)} role="tab" aria-selected={isActive} {...props} />
  );
}
