import FaqPageView from "./view";

export const generateMetadata = ({ params }: { params: { locale: string } }) => {
  const base = 'https://www.2dtocut.com';
  const slug = 'faq';

  return {
    title: "FAQ | CNC Laser Cutting Questions & Answers",
    description:
    "Find answers to frequently asked questions about our CNC laser cutting services. Learn more about process, delivery, and materials.",
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
export default function FaqPage() {
  return <FaqPageView />;
}