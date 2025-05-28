import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/routing";
import { getPosts } from "@/lib/getBlogs";
import { MetadataRoute } from "next";

const siteUrl = siteConfig.url.replace(/\/$/, ""); // URL sonunda / varsa kaldır

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
  const staticPages = [
    "/", // root sayfa
    "/blogs",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
    "/contact",
    "/faq",
  ];

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

  const blogPosts = await Promise.all(
    LOCALES.map(async (locale) => {
      const { posts } = await getPosts(locale);
      return posts.map((post) => {
        const cleanSlug = post.slug.replace(/^\/+/, ""); // Baştaki slash'ı temizle
        const path = `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/blogs/${cleanSlug}`;
        return {
          url: `${siteUrl}${path}`,
          lastModified: post.metadata.updatedAt || post.date,
          changeFrequency: "daily" as const,
          priority: 0.7,
        };
      });
    })
  ).then((results) => results.flat());

  return [...pages, ...blogPosts];
}
