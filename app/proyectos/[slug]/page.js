'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import MiniGallerySlider from '@/components/MiniGallerySlider';
import ProjectDetailHero from '@/components/ProjectDetailHero';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getProjectBySlug } from '@/data/projects';
import { buildProyectoSimilarMessage, getWhatsAppUrl, hasWhatsAppConfigured } from '@/lib/whatsapp';

export default function ProjectDetailPage() {
  const params = useParams();
  const project = params?.slug ? getProjectBySlug(params.slug) : null;

  if (!project) {
    return (
      <section className="py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-neutral-text mb-4">Proyecto no encontrado</h1>
        <Link href="/proyectos" className="text-primary hover:underline">
          Volver a proyectos
        </Link>
      </section>
    );
  }

  const waMessage = buildProyectoSimilarMessage(project.title);
  const waUrl = hasWhatsAppConfigured() ? getWhatsAppUrl(waMessage) : null;

  return (
    <>
      <ProjectDetailHero project={project} />

      {/* Bloque editorial: chips + resumen (reemplaza datos sueltos) */}
      <Section className="bg-neutral-soft/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-lg bg-white border border-neutral-border/80 text-neutral-text text-sm font-medium shadow-sm">
              {project.ubicacion}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary border border-primary-200 text-sm font-semibold">
              {project.año}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-neutral-border/80 text-neutral-text text-sm font-medium">
              Cocina {project.tipo}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-neutral-border/80 text-neutral-muted text-sm">
              {project.tiempoObra}
            </span>
            {project.materiales?.map((m) => (
              <span
                key={m}
                className="px-3 py-1.5 rounded-lg bg-white/80 border border-neutral-border/60 text-neutral-muted text-sm"
              >
                {m}
              </span>
            ))}
          </div>
          <p className="text-neutral-muted leading-relaxed text-base md:text-lg">
            {project.problema?.slice(0, 180).trim()}
            {project.problema?.length > 180 ? '…' : ''}
          </p>
        </motion.div>
      </Section>

      {/* El desafío y La solución */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-neutral-text mb-4">El desafío</h2>
            <p className="text-neutral-muted leading-relaxed">{project.problema}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-neutral-text mb-4">La solución</h2>
            <p className="text-neutral-muted leading-relaxed">{project.solucion}</p>
          </motion.div>
        </div>
      </Section>

      {/* Antes y Después: dos mini sliders */}
      <Section className="bg-neutral-soft">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MiniGallerySlider
              images={project.galeriaAntes ?? []}
              title="Antes"
              altPrefix={`${project.title} antes`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MiniGallerySlider
              images={project.galeriaDespues ?? []}
              title="Después"
              altPrefix={`${project.title} después`}
            />
          </motion.div>
        </div>
      </Section>

    </>
  );
}
