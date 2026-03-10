'use client';

import { cn } from '@/lib/cn';

export default function Textarea({
  label,
  id,
  error,
  className,
  rows = 4,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-text mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-neutral-border bg-white text-neutral-text placeholder-neutral-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus-ring resize-none',
          error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
