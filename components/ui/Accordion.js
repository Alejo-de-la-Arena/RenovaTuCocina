'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'rounded-xl border overflow-hidden transition-all duration-200',
              isOpen ? 'border-primary/30 bg-white shadow-soft' : 'border-neutral-border bg-white hover:border-neutral-soft-dark hover:shadow-card'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-4 text-left font-medium text-neutral-text hover:bg-neutral-soft/40 transition-colors focus-ring"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-trigger-${index}`}
            >
              <span className="text-sm md:text-base pr-2">{item.title}</span>
              <ChevronDown
                className={cn('w-5 h-5 text-primary shrink-0 transition-transform duration-300 ease-out', isOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${index}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0 md:px-6 md:pb-5 text-neutral-muted leading-relaxed text-sm md:text-base border-t border-neutral-border/80">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
