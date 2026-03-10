'use client';

import { cn } from '@/lib/cn';

export default function Input({
  label,
  id,
  error,
  helperText,
  className,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-text mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-neutral-border bg-white text-neutral-text placeholder-neutral-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus-ring',
          error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
          className
        )}
        {...props}
      />
      {helperText && !error && <p className="mt-1.5 text-xs text-neutral-muted">{helperText}</p>}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
