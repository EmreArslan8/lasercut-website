import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ThemeRegistry from "@/theme/ThemeRegistery";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { DrawerProvider } from "@/context/DrawerContext";
import { ShopProvider } from "@/context/ShopContext";
import { Locale } from "@/i18n";
import plusJakartaSans from "@/fonts/plusJakartaSans";
import Script from "next/script";

export const dynamicParams = true;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Önce params nesnesini await ediyoruz
  const awaitedParams = await Promise.resolve(params);
  const { locale } = awaitedParams;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
        <meta
          name="google-site-verification"
          content="OLVVNKCEZdG0rwG2NJL7Tpe-HaHDFGLwR2surVdG1QM"
        />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="9x2GwqPcLFH+H/ak0ZjndA" async></script>
        <link rel="icon" href="/favicon_v2.ico" />
        <link rel="shortcut icon" href="/favicon_v2.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon_v2.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="https://cdn.shopify.com/s/files/1/0653/1602/8497/files/banner-desktop-1.webp?v=1742229467&q=75"
        />
      </head>

      <body
        className={plusJakartaSans.className}
        style={{ overflowX: "hidden" }}
      >
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

export const generateMetadata = async ({
  params,
}: {
  params: { locale: Locale };
}) => {
  const awaitedParams = await Promise.resolve(params);
  const locale = awaitedParams.locale;
  const baseUrl = "https://www.2dtocut.com";

  return {
    title: "2dtocut | CNC Cutting Solutions",
    description: 
      "Precision CNC laser cutting for metal parts. Fast delivery, expert service, and reliable quality..Get a free quote today!",    
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        tr: `${baseUrl}/tr`,
        "x-default": `${baseUrl}/en`,
      },
    },

    icons: {
      icon: "/favicon_v2.ico",
      shortcut: "/favicon_v2.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          url: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          url: "/android-chrome-512x512.png",
        },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: "2dtocut | CNC Cutting Solutions",
      description: "Providing high-quality CNC cutting solutions.",
      siteName: "2dtocut",
      type: "website",
      images: [
        {
          url: "/ogBanner.webp",
          width: 1200,
          height: 630,
          alt: "2dtocut CNC Cutting",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "2dtocut | CNC Cutting Solutions",
      description: "Providing high-quality CNC cutting solutions.",
      images: ["/ogBanner.webp"],
    },
    verification: {
      google: "OLVVNKCEZdG0rwG2NJL7Tpe-HaHDFGLwR2surVdG1QM",
    },
  };
};


