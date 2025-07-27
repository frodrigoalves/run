
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
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Suppress warnings for these optional modules
    config.resolve.alias['@opentelemetry/exporter-jaeger'] = false;
    config.resolve.alias['@genkit-ai/firebase'] = false;
    
    return config;
  },
  // Add this to allow requests from the development environment
  experimental: {
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
  // Add this to provide the same aliases for Turbopack
  turbo: {
    resolveAliases: {
      '@opentelemetry/exporter-jaeger': false,
      '@genkit-ai/firebase': false,
    },
  },
};

export default nextConfig;
