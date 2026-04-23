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
      className="group h-full"
    >
      <Link href={`/proyectos/${project.slug}`} className="block h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-neutral-border bg-white shadow-[0_14px_30px_-26px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary-200/60 group-hover:shadow-[0_18px_36px_-24px_rgba(123,30,30,0.35)]">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={project.imagenPrincipal || project.galeriaDespues?.[0]}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="primary">{project.tipo}</Badge>
              {project.materiales?.[0] && <Badge>{project.materiales[0]}</Badge>}
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold tracking-tight text-neutral-text transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mb-4 text-sm text-neutral-muted">{project.ubicacion}</p>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-3">
              Ver antes/después
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
