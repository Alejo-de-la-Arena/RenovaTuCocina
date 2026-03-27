'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 8000;
const TRANSITION_DURATION = 0.8;
const easing = [0.25, 0.46, 0.45, 0.94];

function formatCounter(i, total) {
  return String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
}

export default function ProjectDetailHeroPremium({ project }) {
  const afterImages = project?.galeriaDespues?.length
    ? project.galeriaDespues
    : project?.imagenPrincipal
      ? [project.imagenPrincipal]
      : [];
  const slides = project?.imagenPrincipal && !afterImages.includes(project.imagenPrincipal)
    ? [project.imagenPrincipal, ...afterImages]
    : afterImages;
  const hasMultiple = slides.length > 1;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (i) => setIndex((prev) => (i + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % slides.length),
    [slides.length]
  );
  const prev = useCallback(
    () => setIndex((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, isPaused, next, hasMultiple]);

  if (!project || !slides.length) return null;

  const tagline =
    project.solucion?.slice(0, 120).trim() + (project.solucion?.length > 120 ? '…' : '') || '';

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-neutral-text"
      onMouseEnter={() => hasMultiple && setIsPaused(true)}
      onMouseLeave={() => hasMultiple && setIsPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION + 0.2, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index]}
              alt={`${project.title} — imagen ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.16),transparent_38%),linear-gradient(180deg,rgba(8,8,8,0.2)_0%,rgba(8,8,8,0.35)_34%,rgba(8,8,8,0.84)_100%)]"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {hasMultiple && (
        <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-black/25 px-4 py-2 font-mono text-xs md:text-sm text-white/90 tracking-[0.28em] backdrop-blur-md">
            {formatCounter(index, slides.length)}
          </span>
        </div>
      )}

      {hasMultiple && (
        <>
          <motion.button
            type="button"
            onClick={prev}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="absolute left-4 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-40 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            type="button"
            onClick={next}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="absolute right-4 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 z-40 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: easing }}
          className="pointer-events-auto max-w-4xl rounded-3xl border border-white/20 bg-black/25 p-5 md:p-7 lg:p-8 backdrop-blur-md shadow-[0_24px_58px_rgba(0,0,0,0.32)]"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: easing }}
            className="inline-block text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/80 mb-4"
          >
            Caso de estudio
          </motion.span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-3 md:mb-4">
            {project.title}
          </h1>
          {tagline && (
            <p className="text-sm md:text-base lg:text-lg text-white/85 max-w-2xl leading-relaxed">
              {tagline}
            </p>
          )}
          {hasMultiple && (
            <div className="flex items-center gap-2.5 mt-5 md:mt-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    'rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                    i === index
                      ? 'h-2 w-10 bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                      : 'h-2 w-2 bg-white/40 hover:bg-white/65'
                  )}
                  aria-label={`Ir a imagen ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easing }}
            className="mt-6 md:mt-7 w-full max-w-sm h-px bg-gradient-to-r from-white/50 via-white/15 to-transparent"
          />
        </motion.div>

        {hasMultiple && (
          <div className="mt-4 md:mt-6 flex justify-end pr-1">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.24em] text-white/60">
              Deslizá o usá flechas
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
