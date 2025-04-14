import PhotoGalleryView from "./view";

export const generateMetadata = ({ params }: { params: { locale: string } }) => {
  const base = 'https://www.2dtocut.com';
  const slug = 'examples';

  return {
    title: "CNC Laser Cutting Examples | 2dtocut Precision Showcase",
    description:
    "Explore examples of CNC laser cut projects by 2dtocut. Precision metal cutting, quality design, and clean finishing.",
  alternates: {
    canonical: `${base}/${params.locale}/${slug}`,
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