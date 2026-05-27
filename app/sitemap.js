import { getPublicProjectSlugs } from '@/lib/projects/queries';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://renovatucocina.com.ar';

export default async function sitemap() {
  const slugs = await getPublicProjectSlugs();
  const projectUrls = slugs.map((slug) => ({
    url: `${BASE}/proyectos/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/proyectos`, lastModified: new Date() },
    ...projectUrls,
    { url: `${BASE}/reformas`, lastModified: new Date() },
    { url: `${BASE}/como-trabajamos`, lastModified: new Date() },
    { url: `${BASE}/contacto`, lastModified: new Date() },
  ];
}
