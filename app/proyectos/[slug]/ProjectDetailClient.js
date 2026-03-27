'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import ProjectDetailHeroPremium from '@/components/project-detail/ProjectDetailHeroPremium';
import ProjectChallengeSolution from '@/components/project-detail/ProjectChallengeSolution';
import ProjectBeforeAfterPremium from '@/components/project-detail/ProjectBeforeAfterPremium';
import ProjectMaterialsPremium from '@/components/project-detail/ProjectMaterialsPremium';
import ProjectGalleryEditorial from '@/components/project-detail/ProjectGalleryEditorial';
import ProjectCTAPremium from '@/components/project-detail/ProjectCTAPremium';

export default function ProjectDetailClient({ project }) {
  if (!project) {
    return (
      <Section className="py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-neutral-text mb-4">Proyecto no encontrado</h1>
        <Link href="/proyectos" className="text-primary hover:underline">
          Volver a proyectos
        </Link>
      </Section>
    );
  }

  return (
    <>
      <ProjectDetailHeroPremium project={project} />
      <ProjectChallengeSolution project={project} />
      <ProjectBeforeAfterPremium project={project} />
      <ProjectMaterialsPremium project={project} />
      <ProjectGalleryEditorial project={project} />
      <ProjectCTAPremium project={project} />
    </>
  );
}
