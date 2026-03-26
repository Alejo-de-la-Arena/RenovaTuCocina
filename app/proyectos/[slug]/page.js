import { notFound } from 'next/navigation';
import { getPublicProjectBySlug } from '@/lib/projects/queries';
import ProjectDetailClient from '@/app/proyectos/[slug]/ProjectDetailClient';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) {
    return { title: 'Proyecto' };
  }
  const title = project.metaTitle || project.title;
  const description =
    project.metaDescription ||
    project.descripcionCorta ||
    (project.problema ? String(project.problema).slice(0, 160) : '');
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
