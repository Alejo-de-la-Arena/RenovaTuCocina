/** @type {import('next').NextConfig} */

const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'plus.unsplash.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'res.cloudinary.com',
    pathname: '/**',
  },
];

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const host = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
    remotePatterns.push({
      protocol: 'https',
      hostname: host,
      pathname: '/storage/v1/object/public/**',
    });
  }
} catch {
  /* env inválido en build */
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
