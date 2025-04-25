import { Locale } from "@/i18n";
import ContactPageView from "./view";
import { Metadata } from "next";


export async function generateMetadata(props: any): Promise<Metadata> {
  const { locale } = props.params as { locale: Locale };
  const base = 'https://www.2dtocut.com';
  const slug = 'contact';

  return {
    title: "Contact Us | Get in Touch with 2dtocut Today",
    description:
      "Need help? Reach out to our team for expert CNC laser cutting support, guidance, and answers to all your inquiries..",
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

export default function ContactPage() {
  return <ContactPageView />;
}