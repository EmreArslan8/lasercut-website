import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/routing";
import { getPosts } from "@/lib/getBlogs";
import { MetadataRoute } from "next";

const siteUrl = siteConfig.url.replace(/\/$/, ""); // Sonundaki '/' karakterini kaldır

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statik sayfalar
  const staticPages = [
    "/",
    "/blogs",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
    "/contact",
    "/faq",
  ];

  // Statik sayfaları locale ile birlikte oluştur
  const pages = LOCALES.flatMap((locale) => {
    return staticPages.map((page) => {
      const path =
        locale === DEFAULT_LOCALE
          ? page
          : `/${locale}${page === "/" ? "" : page}`;
      return {
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "daily" as ChangeFrequency,
        priority: page === "/" ? 1.0 : 0.8,
      };
    });
  });

  console.log("📄 Statik sayfa sayısı:", pages.length);

  // Blog postlarını her locale için sitemap'e ekle
  const blogPosts = await Promise.all(
    LOCALES.map(async (locale) => {
      const { posts } = await getPosts(locale);
      console.log(`📝 ${locale} locale için blog sayısı: ${posts.length}`);
      return posts.map((post) => {
        const cleanSlug = post.slug.replace(/^\/+/, "");
        const path = `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/blogs/${cleanSlug}`;
        console.log("🔗 Blog URL eklendi:", `${siteUrl}${path}`);
        return {
          url: `${siteUrl}${path}`,
          lastModified: post.metadata.updatedAt || post.date,
          changeFrequency: "daily" as const,
          priority: 0.7,
        };
      });
    })
  ).then((results) => results.flat());

  console.log("🧩 Toplam blog post sayısı:", blogPosts.length);
  console.log(
    "✅ Toplam URL sayısı (pages + blogPosts):",
    pages.length + blogPosts.length
  );

  return [...pages, ...blogPosts];
}
