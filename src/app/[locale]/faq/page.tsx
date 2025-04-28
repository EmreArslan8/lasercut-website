import { Locale } from "@/i18n";
import FaqPageView from "./view";
import { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  const { locale } = props.params as { locale: Locale };
  const base = 'https://2dtocut-v2.vercel.app';
  const slug = 'faq';

  return {
    title: "FAQ | CNC Laser Cutting Questions & Answers",
    description:
    "Find answers to frequently asked questions about our CNC laser cutting services. Learn more about process, delivery, and materials.",
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
export default function FaqPage() {
  return <FaqPageView />;
}