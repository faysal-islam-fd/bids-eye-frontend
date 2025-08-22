/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.birdseyefashion.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.birdseyefashion.com',
        port: '',
        pathname: '/storage/app/public/**',
      },
    ],
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Set default quality
    quality: 85,
    // Enable device pixel ratio optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable blur placeholder
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Performance optimizations
  experimental: {
    // Enable modern features
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // Enable compression
  compress: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize bundle analysis
  webpack: (config, { dev, isServer }) => {
    // Optimize images in production
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.images = {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        name: 'images',
        chunks: 'all',
        enforce: true,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig
