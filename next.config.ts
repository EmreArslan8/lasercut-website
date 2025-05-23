import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true, // Tarayıcıda açmasını engelle
  generateStatsFile: true, // JSON dosyası oluştur
  statsFilename: "webpack-stats.json", // JSON dosya adı
});




const nextConfig: NextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '2dtocut.com' }], // non-www gelen istekler
        destination: 'https://www.2dtocut.com/:path*',
        permanent: true, // 308 veya 301 kalıcı yönlendirme
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow", 
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        // /fonts klasöründeki tüm dosyalar için uzun süreli cache
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // /images klasöründeki tüm dosyalar için
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example-cdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo8.eightheme.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config: { optimization: { usedExports: boolean; sideEffects: boolean; }; }) {
    config.optimization.usedExports = true; // Kullanılmayan exportları temizler (Tree Shaking)
    config.optimization.sideEffects = true; // Gereksiz dosyaları kaldırır
    return config;
  },
});

export default withNextIntl(nextConfig);
