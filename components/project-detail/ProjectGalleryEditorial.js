'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

export default function ProjectGalleryEditorial({ project }) {
  const images = project.galeriaDespues?.length
    ? project.galeriaDespues
    : project.imagenPrincipal
      ? [project.imagenPrincipal]
      : [];
  if (images.length === 0) return null;

  const main = images[0];
  const secondary = images.slice(1, 5);

  return (
    <Section className="bg-warm-50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-text mb-2 tracking-tight">
          Galería
        </h2>
        <p className="text-neutral-muted mb-10 max-w-xl">
          Detalles del proyecto y resultado final.
        </p>

        <div className="space-y-6">
          <div className="relative aspect-[21/9] min-h-[240px] rounded-2xl overflow-hidden bg-neutral-200">
            <Image
              src={main}
              alt={`${project.title} — vista principal`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {secondary.length > 0 && (
            <div
              className={
                secondary.length === 1
                  ? 'grid grid-cols-1 gap-6'
                  : secondary.length === 2
                    ? 'grid grid-cols-2 gap-6'
                    : 'grid grid-cols-2 lg:grid-cols-4 gap-6'
              }
            >
              {secondary.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — detalle ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
