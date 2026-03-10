import { getProjectBySlug, getAllSlugs } from '@/data/projects';

export async function generateMetadata({ params }) {
  const project = params?.slug ? getProjectBySlug(params.slug) : null;
  if (!project) return { title: 'Proyecto no encontrado' };
  return {
    title: project.title,
    description: `${project.ubicacion} — ${project.tipo}. ${project.problema?.slice(0, 120)}...`,
  };
}

export default function ProjectLayout({ children }) {
  return children;
}
