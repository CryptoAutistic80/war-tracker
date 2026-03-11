import type { ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return <button className={cn('ui-button', `ui-button--${variant}`, className)} {...props} />;
}
