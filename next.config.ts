import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React Strict Mode'u etkinleştirir
  //swcMinify: true, // SWC ile hızlı minifikasyon sağlar
  i18n: {
    locales: ["tr", "en"], // Desteklenen diller
    defaultLocale: "tr", // Varsayılan dil
  },
  images: {
    domains: ["example.com", "cdn.example.com"], // Harici görsel alan adları
  },
  webpack: (config, { isServer }) => {
    // Özel Webpack yapılandırması
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // fs modülünü istemci tarafında devre dışı bırakır
      };
    }
    return config;
  },
};

export default nextConfig;
