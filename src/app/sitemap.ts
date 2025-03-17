import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.2dtocut.com";
  const locales = ["en", "tr"]; // Desteklenen diller
  const pages = [
    "/",
    "/about-us",
    "/examples",
    "/faq",
    "/contact",
    "/blog/how-to-easy-engineering",
    "blog/the-future-of-laser-cutting",
    "blog/maximizing-productivity-in-fabrication",
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
