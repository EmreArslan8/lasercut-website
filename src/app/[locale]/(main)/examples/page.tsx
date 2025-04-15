import { Locale } from "@/i18n";
import PhotoGalleryView from "./view";
import { Metadata } from "next";


export async function generateMetadata(props: any): Promise<Metadata> {
  const { locale } = props.params as { locale: Locale };
  const base = 'https://www.2dtocut.com';
  const slug = 'examples';

  return {
    title: "CNC Laser Cutting Examples | 2dtocut Precision Showcase",
    description:
    "Explore examples of CNC laser cut projects by 2dtocut. Precision metal cutting, quality design, and clean finishing.",
  alternates: {
    canonical: `${base}/${locale}/${slug}`,
    languages: {
      en: `${base}/en/${slug}`,
      tr: `${base}/tr/${slug}`,
      'x-default': `${base}/en/${slug}`,
    },
  },
};
};


export default function PhotoGalleryPage() {
  return <PhotoGalleryView />;
}