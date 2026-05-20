import { getProjectBySlug } from '@/data/projects';
import { getTipologiaLabel } from '@/lib/projectFilterLabels';

export async function generateMetadata({ params }) {
  const project = params?.slug ? getProjectBySlug(params.slug) : null;
  if (!project) return { title: 'Proyecto no encontrado' };
  const tipologia = getTipologiaLabel(project.tipo);
  return {
    title: project.title,
    description: `${project.ubicacion}${tipologia ? ` — ${tipologia}` : ''}. ${project.problema?.slice(0, 120)}...`,
  };
}

export default function ProjectLayout({ children }) {
  return children;
}
