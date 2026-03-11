import type { HTMLAttributes } from 'react';
import { cn } from './utils';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'section' | 'div' | 'aside';
}

export function Card({ as = 'div', className, ...props }: CardProps) {
  const Component = as;
  return <Component className={cn('ui-card', className)} {...props} />;
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-card-body', className)} {...props} />;
}
