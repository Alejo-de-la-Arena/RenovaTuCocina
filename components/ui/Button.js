'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-soft',
  secondary: 'bg-neutral-soft text-neutral-text border border-neutral-border hover:bg-white hover:shadow-soft',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary-50',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover shadow-soft focus-ring-whatsapp',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  asChild = false,
  type = 'button',
  disabled,
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizeClasses[size],
    className
  );

  if (href && !href.startsWith('http')) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href && href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'tween', duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
