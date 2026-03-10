'use client';

import { cn } from '@/lib/cn';

export default function Select({ label, id, error, options = [], className, placeholder = 'Seleccionar...', ...props }) {
  return (
    <div className="w-full relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-text mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-neutral-border bg-white text-neutral-text transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus-ring appearance-none cursor-pointer',
          'bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-11',
          "bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27 stroke-width=%272%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')]",
          error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) =>
          typeof opt === 'object' ? (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ) : (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
