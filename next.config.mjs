import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack: (config) => {
    config.resolve.alias['@opentelemetry/exporter-jaeger'] = false;
    config.resolve.alias['@genkit-ai/firebase'] = false;

    return config;
  },
};

export default withNextIntl(nextConfig);
