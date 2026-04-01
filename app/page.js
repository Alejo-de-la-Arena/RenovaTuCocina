import { getPublicProjectsList } from '@/lib/projects/queries';
import HomePageClient from '@/components/home/HomePageClient';

export const revalidate = 60;

function pickRandomStable(list, max) {
  const arr = Array.isArray(list) ? list.filter(Boolean) : [];
  if (arr.length <= max) return arr;
  // Aleatorio solo en servidor (sin hydration mismatch). Estable por render/carga.
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, max);
}

export default async function HomePage() {
  const projects = await getPublicProjectsList();
  const featuredProjects = pickRandomStable(projects, 5);
  return <HomePageClient featuredProjects={featuredProjects} />;
}
