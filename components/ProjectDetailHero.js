'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 6000;
const easing = [0.25, 0.46, 0.45, 0.94];

export default function ProjectDetailHero({ project }) {
  const afterImages = project?.galeriaDespues?.length ? project.galeriaDespues : [project?.imagenPrincipal].filter(Boolean);
  const beforeImages = project?.galeriaAntes?.length ? project.galeriaAntes : [];
  const slides = [...afterImages, ...beforeImages.slice(0, Math.min(2, beforeImages.length))];
  const hasMultiple = slides.length > 1;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((i) => {
    setIndex((prev) => (i + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, isPaused, next, hasMultiple]);

  if (!project || !slides.length) return null;

  return (
    <section
      className="relative h-screen min-h-[500px] w-full overflow-hidden"
      onWheel={hasMultiple ? (e) => {
        if (e.deltaY > 30) { next(); setIsPaused(true); setTimeout(() => setIsPaused(false), AUTOPLAY_MS); }
        else if (e.deltaY < -30) { setIndex((p) => (p - 1 + slides.length) % slides.length); setIsPaused(true); setTimeout(() => setIsPaused(false), AUTOPLAY_MS); }
      } : undefined}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index]}
              alt={`${project.title} - imagen ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" aria-hidden />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay info — ubicación centrada */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <Container className="pointer-events-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easing }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Ubicación centrada */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              {project.ubicacion || project.location || 'Ubicación'}
            </h2>

            {/* (Opcional) título del proyecto debajo, más chico */}
            {project.title && (
              <p className="mt-3 text-white/80 text-base md:text-lg">
                {project.title}
              </p>
            )}
          </motion.div>
        </Container>
      </div>

      {/* Dots */}
      {hasMultiple && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                i === index ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              )}
              aria-label={`Ir a imagen ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </section>
  );
}
