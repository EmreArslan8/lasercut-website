import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.2dtocut.com";
  const locales = ["tr", "en"]; // Desteklenen diller
  const pages = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/products",
  ];

  // 🔹 URLs değişkenine açık bir tür tanımlıyoruz.
  const urls: MetadataRoute.Sitemap = [];

  pages.forEach((page) => {
    urls.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });

    locales.forEach((locale) => {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      });
    });
  });

  return urls;
}
