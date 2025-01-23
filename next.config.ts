import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['flagcdn.com', 'example-cdn.com'], // Add the CDN domain(s) here
  },
};

export default withNextIntl(nextConfig);
