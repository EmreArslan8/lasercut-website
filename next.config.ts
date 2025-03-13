import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false, // Tarayıcıda açmasını engelle
  generateStatsFile: true, // JSON dosyası oluştur
  statsFilename: "webpack-stats.json", // JSON dosya adı
});

const nextConfig: NextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      "flagcdn.com",
      "example-cdn.com",
      "images.unsplash.com",
      "demo8.eightheme.com",
      "cdn.shopify.com"
    ],
  },
  webpack(config: { optimization: { usedExports: boolean; sideEffects: boolean; }; }) {
    config.optimization.usedExports = true; // Kullanılmayan exportları temizler (Tree Shaking)
    config.optimization.sideEffects = true; // Gereksiz dosyaları kaldırır
    return config;
  },
});

export default withNextIntl(nextConfig);
