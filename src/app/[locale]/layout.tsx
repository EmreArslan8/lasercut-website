import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import ThemeRegistry from "@/theme/ThemeRegistery";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { DrawerProvider } from "@/context/DrawerContext";
import { ShopProvider } from "@/context/ShopContext";
import { Locale } from "@/i18n";
import { Metadata } from "next";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

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
      <meta name="google-site-verification" content="OLVVNKCEZdG0rwG2NJL7Tpe-HaHDFGLwR2surVdG1QM" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:wght,FILL@400..700,0..1&display=block"
          rel="stylesheet"
        />

        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
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

export const generateMetadata = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  return {
    title: "2dtocut | CNC Cutting Solutions",
    description: "High-quality CNC cutting services for your business needs.",
    icons: {
      icon: "/favicon.ico", // Varsayılan favicon
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png", // Apple Touch için 512x512
      other: [
        { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: "2dtocut | CNC Cutting Solutions",
      description: "Providing high-quality CNC cutting solutions.",
      url: "https://www.2dtocut.com",
      siteName: "2dtocut",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "2dtocut CNC Cutting",
        },
      ],
      type: "website",
    },
  };
};
