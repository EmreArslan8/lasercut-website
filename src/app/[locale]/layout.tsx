import { CartProvider } from '@/contexts/CartContext';
import { Locale, getMessages } from '@/i18n';
import { getFontFamily } from '@/theme/theme';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { DrawerProvider } from '@/contexts/DrawerContext';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const isProduction = process.env.NEXT_PUBLIC_HOST_ENV === 'production';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
  return (
    <html lang={locale}>
      <head>
        {isProduction && (
          <meta
            name="google-site-verification"
            content="n6n2EfCF4_xpwn238Hwy0W5Vddi-Yq55wh052uDHDZk"
          />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:wght,FILL@400..700,0..1"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: getFontFamily(locale), overflowX: 'hidden' }}>
        <NextIntlClientProvider locale={locale} messages={(await getMessages(locale)) as any}>

            <ThemeRegistry>
          
                  <CartProvider>
                    <DrawerProvider>
                      <Header /> {/* 🧼 Artık kendi verisini kendisi alır */}
                    
                    
                    {children}
                      <Footer  /> 
                    </DrawerProvider>
                  </CartProvider>
               
            </ThemeRegistry>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const generateMetadata = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const t = await getTranslations({ locale, namespace: 'common.metadata' });
  return {
    title: { template: '%s | 2dtocut', default: '2dtocut' },
    description: t('description'),
    metadataBase: process.env.NEXT_PUBLIC_HOST_URL,
    openGraph: {
      description: t('description'),
      images: [
        {
          url: '/static/images/ogBanner.webp',
          alt: '2dtocut',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};
