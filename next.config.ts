import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [
      "flagcdn.com",
      "example-cdn.com",
      "images.unsplash.com",
      "demo8.eightheme.com",
      "cdn.shopify.com" // Shopify CDN eklendi
    ],
  },
};

export default withNextIntl(nextConfig);