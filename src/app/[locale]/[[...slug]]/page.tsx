import { Locale } from '@/i18n';
import isPreviewBot from '@/lib/utils/isPreviewBot';
import HomePageView from './view';
import { Metadata } from 'next';

const HomePage = ({
  params: { slug, locale },
}: {
  params: { slug?: string; locale: Locale; };
}) => {
  if (isPreviewBot()) return <></>;

  return (
    <main>
      <HomePageView />
    </main>
  );
};

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Bringist – your go-to online shop for curated products.',
  openGraph: {
    title: 'Bringist | Home',
    description: 'Discover top-quality items at Bringist.',
    images: [{ url: '/static/images/ogBanner.webp', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default HomePage;
