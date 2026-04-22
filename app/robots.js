const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://renovatucocina.com.ar';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/acceso', '/admin', '/api/admin'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
