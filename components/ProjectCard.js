'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link href={`/proyectos/${project.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-card transition-all duration-300 group-hover:shadow-glow group-hover:border-primary-200/60 group-hover:-translate-y-0.5">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={project.imagenPrincipal || project.galeriaDespues?.[0]}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="primary">{project.tipo}</Badge>
              {project.materiales?.[0] && <Badge>{project.materiales[0]}</Badge>}
            </div>
            <h3 className="font-serif text-xl font-semibold text-neutral-text group-hover:text-primary transition-colors mb-2 tracking-tight">
              {project.title}
            </h3>
            <p className="text-neutral-muted text-sm mb-4">{project.ubicacion}</p>
            <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-200">
              Ver antes/después
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
