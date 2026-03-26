import { getPublicProjectsList } from '@/lib/projects/queries';
import ProyectosPageClient from '@/app/proyectos/ProyectosPageClient';

export const revalidate = 60;

export default async function ProyectosPage() {
  const projects = await getPublicProjectsList();
  return <ProyectosPageClient projects={projects} />;
}
