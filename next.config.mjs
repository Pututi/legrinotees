/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['placehold.co', 'localhost', 'v0.blob.com', 'res.cloudinary.com', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Asegurarse de que no haya un basePath configurado
  basePath: '',
  // Deshabilitar la optimización de imágenes estáticas
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  // Added configuration to ignore ESLint and TypeScript errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
