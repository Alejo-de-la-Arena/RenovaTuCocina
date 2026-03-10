'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import FiltersBar from '@/components/FiltersBar';
import ProjectCard from '@/components/ProjectCard';
import ProyectosHero from '@/components/ProyectosHero';
import { projects } from '@/data/projects';
import { staggerContainer, staggerItem } from '@/lib/motion';

const anos = [...new Set(projects.map((p) => p.año))].sort((a, b) => b - a);

export default function ProyectosPage() {
  const [filters, setFilters] = useState({ search: '', tipo: '', material: '', ano: '' });

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (!p.title.toLowerCase().includes(search) && !p.ubicacion.toLowerCase().includes(search)) {
          return false;
        }
      }
      if (filters.tipo) {
        const tipo = filters.tipo.toLowerCase();
        if (!p.tipo?.toLowerCase().includes(tipo)) return false;
      }
      if (filters.material) {
        const mat = filters.material.toLowerCase();
        const match = p.materiales?.some((m) => m.toLowerCase().includes(mat));
        if (!match) return false;
      }
      if (filters.ano && p.año !== Number(filters.ano)) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <ProyectosHero projects={projects} />

      <Section id="proyectos-grid" className="bg-white pt-16 md:pt-20 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <FiltersBar onFilter={setFilters} anos={anos} />
        </motion.div>
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-neutral-muted text-lg">No se encontraron proyectos con esos filtros.</p>
            <p className="text-neutral-muted text-sm mt-2">Probá cambiar los criterios de búsqueda.</p>
          </motion.div>
        )}
      </Section>
    </>
  );
}
