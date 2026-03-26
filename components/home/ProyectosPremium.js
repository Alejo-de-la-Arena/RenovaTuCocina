'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { staggerContainer, staggerItem } from '@/lib/motion';

/**
 * @param {object} props
 * @param {Array} props.featuredProjects — hasta 5 desde el panel (destacado_home + visible); orden por prioridad.
 */
export default function ProyectosPremium({ featuredProjects = [] }) {
  const list = Array.isArray(featuredProjects) ? featuredProjects : [];
  const featured = list[0];
  const gridProjects = list.slice(1, 5);

  return (
    <Section id="proyectos" className="bg-white">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-14"
      >
        <div>
          <motion.h2
            variants={staggerItem}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-text mb-4 tracking-tight"
          >
            Proyectos reales
          </motion.h2>
          <motion.p variants={staggerItem} className="text-neutral-muted max-w-xl">
            Transformaciones recientes en Zona Norte y CABA.
          </motion.p>
        </div>
        <motion.div variants={staggerItem} className="w-full md:w-auto">
          <Button href="/proyectos" variant="ghost" className="text-neutral-text w-full md:w-auto min-h-[44px]">
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {featured ? (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <Link href={`/proyectos/${featured.slug}`} className="group block">
            <div className="relative w-full max-w-full aspect-[16/10] sm:aspect-[21/9] min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden bg-neutral-soft">
              <Image
                src={featured.imagenPrincipal || featured.galeriaDespues?.[0] || '/assets/brand/logo-mdv.webp'}
                alt={featured.title}
                fill
                sizes="(max-width: 640px) 100vw, 1200px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {featured.tipo && (
                    <span className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-medium">
                      {featured.tipo}
                    </span>
                  )}
                  {featured.materiales?.[0] && (
                    <span className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                      {featured.materiales[0]}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-white/95 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-white/80 text-sm mb-3 md:mb-4">{featured.ubicacion}</p>
                <span className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
                  Ver proyecto
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-neutral-muted text-center py-8 mb-6 max-w-lg mx-auto"
        >
          Pronto sumamos nuevos proyectos destacados. Entrá al portfolio completo para ver casos reales.
        </motion.p>
      )}

      {gridProjects.length > 0 && (
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {gridProjects.map((p, i) => (
            <motion.article key={p.slug} variants={staggerItem} className="group">
              <Link href={`/proyectos/${p.slug}`} className="block">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 group-hover:shadow-medium group-hover:border-neutral-soft-dark">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={p.imagenPrincipal || p.galeriaDespues?.[0] || '/assets/brand/logo-mdv.webp'}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {p.tipo && (
                        <span className="px-2.5 py-1 rounded-md bg-white/90 text-neutral-text text-xs font-medium">
                          {p.tipo}
                        </span>
                      )}
                      {p.galeriaAntes?.length > 0 && (
                        <span className="px-2.5 py-1 rounded-md bg-black/50 text-white text-xs font-medium">
                          Antes/Después
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-serif text-lg font-semibold text-neutral-text group-hover:text-primary transition-colors mb-1 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-neutral-muted text-sm">{p.ubicacion}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </Section>
  );
}
