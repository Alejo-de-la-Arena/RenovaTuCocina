'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

const easing = [0.25, 0.46, 0.45, 0.94];

export default function MiniGallerySlider({ images = [], title, altPrefix }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goTo = useCallback((i) => {
    setIndex((prev) => (i + images.length) % images.length);
  }, [images.length]);

  if (!images?.length) return null;

  return (
    <div className="w-full">
      <h3 className="font-serif text-xl font-bold text-neutral-text mb-4">{title}</h3>
      <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-border/80 shadow-soft">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${altPrefix} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {hasMultiple && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    'rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                    i === index ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80'
                  )}
                  aria-label={`Imagen ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
