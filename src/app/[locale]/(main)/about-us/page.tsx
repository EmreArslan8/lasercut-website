import { Metadata } from 'next';
import { Locale } from '@/i18n';
import AboutUsView from './view';

export async function generateMetadata(props: any): Promise<Metadata> {
  const { locale } = props.params as { locale: Locale }; // ✅ Explicit type assertion
  const base = 'https://www.2dtocut.com';
  const slug = 'about-us';

  return {
    title: 'About Us | Learn More About 2dtocut',
    description:
      'Discover who we are and what we do at 2dtocut. CNC laser cutting expertise delivered with precision and speed.',
    alternates: {
      canonical: `${base}/${locale}/${slug}`,
      languages: {
        en: `${base}/en/${slug}`,
        tr: `${base}/tr/${slug}`,
        'x-default': `${base}/en/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function AboutPage() {
  return <AboutUsView />;
}
