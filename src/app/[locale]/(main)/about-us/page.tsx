import AboutUsView from "./view";


export const generateMetadata = ({ params }: { params: { locale: string } }) => {
  const base = 'https://www.2dtocut.com';
  const slug = 'about-us';

  return {
  title: "About 2dtocut | Expert CNC Laser Cutting Company",
  description:
  "Discover the story, values, and mission behind 2dtocut. We specialize in high-quality CNC laser cutting tailored to your needs.",
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

export default function AboutPage() {
  return <AboutUsView />;
}