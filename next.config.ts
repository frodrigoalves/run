import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Suppress warnings for these optional modules
    config.resolve.alias['@opentelemetry/exporter-jaeger'] = false;
    config.resolve.alias['@genkit-ai/firebase'] = false;
    
    return config;
  },
};

export default nextConfig;
