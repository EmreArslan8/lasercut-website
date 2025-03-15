import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import ThemeRegistry from "@/theme/ThemeRegistery";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { DrawerProvider } from "@/context/DrawerContext";
import { ShopProvider } from "@/context/ShopContext";
import { Locale } from "@/i18n";

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
  const { locale } = await Promise.resolve(params);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
        <NextIntlClientProvider
          messages={await getMessages({ locale: params.locale })}
        >
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
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata",
  });

  return {
    metadataBase: new URL("https://www.2dtocut.com"),
    title: { default: "2dtocut", template: "%s | 2dtocut" },
    description: t("description"),
    openGraph: {
      description: t("description"),
      images: [
        {
          url: "/static/images/useShop.png",
          alt: "2dtocut",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};
