'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import TrustBar from './TrustBar';
import { cn } from '@/lib/cn';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920';
const HERO_IMAGE_ALT =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920';

const easing = [0.25, 0.46, 0.45, 0.94];

export default function HeroPremium({
  ctaRenovar,
  ctaDesdeCero,
  showBeforeAfter = true,
}) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Imagen de fondo — una sola, cinematográfica */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={showAfter ? 'after' : 'before'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={showAfter ? HERO_IMAGE : HERO_IMAGE_ALT}
              alt="Cocina renovada a medida"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full pb-24 pt-32 md:pb-32 md:pt-40">
        <Container className="pointer-events-auto">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easing }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.08] tracking-tight">
              Transformamos tu cocina.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              Proyecto integral: diseño, fabricación e instalación. Resultados reales, proceso claro.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {ctaRenovar}
              {ctaDesdeCero}
            </div>

            {showBeforeAfter && (
              <button
                type="button"
                onClick={() => setShowAfter((a) => !a)}
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg px-2 py-1'
                )}
                aria-pressed={!showAfter}
              >
                <span className="w-8 h-5 rounded bg-white/20 flex items-center">
                  <span
                    className={cn(
                      'w-4 h-3.5 rounded-sm bg-white/90 transition-transform ml-0.5',
                      !showAfter && 'translate-x-3.5'
                    )}
                  />
                </span>
                {showAfter ? 'Ver antes' : 'Ver después'}
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-12 md:mt-16"
          >
            <TrustBar />
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
