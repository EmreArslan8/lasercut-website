import { NextIntlClientProvider } from "next-intl";

import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

import ThemeRegistry from "@/theme/ThemeRegistery";
import { Plus_Jakarta_Sans as _Plus_Jakarta_Sans } from "next/font/google";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

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
      <body className={Plus_Jakarta_Sans.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeRegistry>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </ThemeRegistry>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
