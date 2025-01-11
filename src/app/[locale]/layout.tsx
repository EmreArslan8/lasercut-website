import { NextIntlClientProvider } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import ThemeRegistry from "@/theme/ThemeRegistery";
import { Plus_Jakarta_Sans as _Plus_Jakarta_Sans } from 'next/font/google';

const Plus_Jakarta_Sans = _Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});



export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // params bir Promise olabilir
}) {
  const resolvedParams = await params; // Promise'i çöz
  const { locale } = resolvedParams;

  const messages = await getMessages(); // locale'i burada kullanarak mesajları al

  return (
    <html lang={locale}>
     <body className={Plus_Jakarta_Sans.className}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <ThemeRegistry>
              <Header />
              <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
              <Footer />
            </ThemeRegistry>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}