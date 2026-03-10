'use client';

import { cn } from '@/lib/cn';

export default function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-neutral-soft text-neutral-text border border-neutral-border',
    primary: 'bg-primary-50 text-primary border border-primary-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
