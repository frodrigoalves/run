const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = withNextIntl(nextConfig);
