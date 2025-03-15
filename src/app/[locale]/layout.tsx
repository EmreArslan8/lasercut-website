import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getTranslations } from 'next-intl/server';
import ThemeRegistry from "@/theme/ThemeRegistery";
import { Plus_Jakarta_Sans as _Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { DrawerProvider } from "@/context/DrawerContext";
import { Locale } from "@/i18n";
import { ShopProvider } from "@/context/ShopContext";

export const dynamicParams = true;

const Plus_Jakarta_Sans = _Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const awaitedParams = await Promise.resolve(params);
  const { locale } = awaitedParams;
  const messages = await getMessages({ locale });




  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:wght,FILL@400..700,0..1&display=block"
          rel="stylesheet"
        />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={Plus_Jakarta_Sans.className} style={{overflowX: 'hidden'}}>
        <NextIntlClientProvider messages={messages}>
          <ThemeRegistry>
        <ShopProvider>
            <DrawerProvider>
             
              <main>{children}</main>
              
              </DrawerProvider>
              </ShopProvider>
          </ThemeRegistry>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export const generateMetadata = async ({ params }: { params: { locale: Locale } }) => {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {  default: '2dtocut', template: '%s | 2dtocut', },
    description: t('description'),
    openGraph: {
      description: t('description'),
      images: [
        {
          url: '/static/images/useShop.png',
          alt: '2dtocut',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};
