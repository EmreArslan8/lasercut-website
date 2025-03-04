import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/Footer";
import { getMessages, getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import ThemeRegistry from "@/theme/ThemeRegistery";
import { Plus_Jakarta_Sans as _Plus_Jakarta_Sans } from "next/font/google";
import Header from "../components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  children: ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:wght,FILL@400..700,0..1&display=block"
          rel="stylesheet"
        />
        {/* Google Analytics (GA4) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`} />
        <script
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
          <CartProvider>
            <ThemeRegistry>
              <Header />
              <main style={{ minHeight: "calc(100vh - 200px)" }}>
                {children}
              </main>
              <Footer />
            </ThemeRegistry>
          </CartProvider>
        </NextIntlClientProvider>

        {/* Vercel Speed Insights ve Analytics */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
