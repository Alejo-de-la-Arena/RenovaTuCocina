'use client';

import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

export default function Card({ children, className, hover = false }) {
  const baseClasses = cn(
    'rounded-2xl border border-neutral-border bg-white p-6 shadow-card transition-all duration-300',
    hover && 'hover:shadow-glow hover:border-primary-200/60 hover:-translate-y-0.5',
    className
  );

  if (hover) {
    return (
      <motion.div
        className={baseClasses}
        initial="rest"
        whileHover="hover"
        variants={{
          rest: { y: 0 },
          hover: { y: -4 },
        }}
        transition={{ type: 'tween', duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
