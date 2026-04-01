'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';

export default function ProjectGalleryEditorial({ project }) {
  const unique = new Set();
  const galleryCandidates = [
    ...(Array.isArray(project.galeriaProyecto) ? project.galeriaProyecto : []),
    ...(Array.isArray(project.galeriaDespues) ? project.galeriaDespues : []),
    ...(project.imagenPrincipal ? [project.imagenPrincipal] : []),
  ];
  const images = galleryCandidates.filter((src) => {
    if (!src || unique.has(src)) return false;
    unique.add(src);
    return true;
  });
  if (images.length === 0) return null;

  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6500);
    return () => clearInterval(t);
  }, [hasMultiple, images.length]);

  return (
    <Section className="bg-[linear-gradient(180deg,#ece8e1_0%,#f7f4ef_100%)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-full"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1f1913] mb-3 tracking-tight">
          Galería
        </h2>
        <p className="text-[#5f574b] mb-10 md:mb-12 max-w-2xl text-base md:text-lg">
          Detalles del proyecto y resultado final.
        </p>

        <div className="max-w-full rounded-[30px] border border-[#dbd2c5] bg-white p-3 md:p-4 shadow-[0_22px_60px_rgba(28,21,13,0.12)]">
        <div className="relative w-full min-h-[280px] md:min-h-[460px] lg:min-h-[560px] rounded-[24px] overflow-hidden bg-neutral-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt={`${project.title} — vista ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />
              </motion.div>
            </AnimatePresence>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {hasMultiple && (
            <div className="mt-4 md:mt-5 grid w-full max-w-full min-w-0 grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative aspect-[4/3] w-full min-w-0 rounded-xl overflow-hidden border transition-all duration-300 ${
                    i === index
                      ? 'border-[#9f8b6a] ring-2 ring-[#beab89]/50'
                      : 'border-[#ddd4c8] hover:border-[#bba883]'
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                  aria-current={i === index}
                >
                  <Image
                    src={src}
                    alt={`${project.title} miniatura ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 20vw, 10vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
