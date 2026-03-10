import { getAllSlugs } from '@/data/projects';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://renovatucocina.com';

export default function sitemap() {
  const slugs = getAllSlugs();
  const projectUrls = slugs.map((slug) => ({
    url: `${BASE}/proyectos/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/proyectos`, lastModified: new Date() },
    ...projectUrls,
    { url: `${BASE}/como-trabajamos`, lastModified: new Date() },
    { url: `${BASE}/contacto`, lastModified: new Date() },
  ];
}
