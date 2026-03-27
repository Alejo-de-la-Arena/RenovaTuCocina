'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function Accordion({ items = [], variant = 'default', defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(
    defaultOpenIndex !== null && defaultOpenIndex !== undefined ? defaultOpenIndex : null
  );

  const isPremium = variant === 'premium';

  return (
    <div
      className={cn(
        isPremium &&
          'rounded-[28px] border border-[#ebe4dc] bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_100%)] p-2 shadow-[0_24px_60px_-32px_rgba(20,16,12,0.12)] md:p-3'
      )}
    >
      <div className={cn(isPremium ? 'space-y-2 md:space-y-2.5' : 'space-y-2')}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isPremium ? 'rounded-2xl border border-[#e8e2da] bg-white/80 backdrop-blur-sm' : 'rounded-xl border',
                !isPremium && isOpen ? 'border-primary/30 bg-white shadow-soft' : !isPremium && 'border-neutral-border bg-white hover:border-neutral-soft-dark hover:shadow-card',
                isPremium && isOpen && 'border-primary/25 bg-white shadow-[0_12px_32px_-16px_rgba(20,16,12,0.1)] ring-1 ring-primary/10',
                isPremium && !isOpen && 'border-[#ebe4dc] bg-white/60 hover:border-primary/15 hover:bg-white'
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  'group flex w-full items-center justify-between gap-4 text-left font-medium transition-colors focus-ring',
                  isPremium
                    ? 'rounded-2xl px-5 py-5 text-[#1a1612] md:px-6 md:py-5'
                    : 'px-5 py-4 md:px-6 md:py-4 hover:bg-neutral-soft/40',
                  !isPremium && 'text-neutral-text'
                )}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
                id={`accordion-trigger-${index}`}
              >
                <span
                  className={cn(
                    'pr-2',
                    isPremium ? 'text-[15px] font-semibold leading-snug md:text-base' : 'text-sm md:text-base'
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300',
                    isPremium
                      ? isOpen
                        ? 'border-primary/25 bg-primary/[0.08] text-primary'
                        : 'border-[#ebe4dc] bg-[#faf9f7] text-[#8a8277] group-hover:bg-white'
                      : ''
                  )}
                >
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 transition-transform duration-300 ease-out',
                      !isPremium && 'text-primary',
                      isPremium && 'text-current',
                      isOpen && 'rotate-180'
                    )}
                  />
                </span>
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
                    <div
                      className={cn(
                        'border-t leading-relaxed text-[#5c554c]',
                        isPremium
                          ? 'border-[#f0ebe4] px-5 pb-5 pt-4 text-[15px] md:px-6 md:pb-6 md:text-base'
                          : 'border-neutral-border/80 px-5 pb-4 pt-0 text-sm md:px-6 md:pb-5 md:text-base'
                      )}
                    >
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
