import { getFeaturedProjectsForHome } from '@/lib/projects/queries';
import HomePageClient from '@/components/home/HomePageClient';

export const revalidate = 60;

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjectsForHome();
  return <HomePageClient featuredProjects={featuredProjects} />;
}
