'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/cn';

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920',
    alt: 'Cocina moderna a medida',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
    alt: 'Diseño e instalación de cocinas',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1920',
    alt: 'Renovación integral',
  },
];

const AUTOPLAY_MS = 10000;
const easing = [0.25, 0.46, 0.45, 0.94];

export default function HeroSlider({ onCtaRenovar, onCtaDesdeCero }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((i) => {
    setIndex((prev) => (i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, isPaused, next]);

  const handleWheel = (e) => {
    if (e.deltaY > 30) {
      next();
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), AUTOPLAY_MS);
    } else if (e.deltaY < -30) {
      setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), AUTOPLAY_MS);
    }
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index].src}
              alt={SLIDES[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenido fijo (misma posición en todos los slides) */}
      <div className="relative z-10 w-full pointer-events-none">
        <Container className="pointer-events-auto">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easing }}
          >
            <p className="font-script text-2xl md:text-3xl text-white/90 mb-2">Diseño e instalación</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Renovación de cocinas a medida
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              Diseño, fabricación e instalación. Antes y después reales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {onCtaRenovar}
              {onCtaDesdeCero}
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
              i === index ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Ir a slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>


    </section>
  );
}
