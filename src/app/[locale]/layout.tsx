import { NextIntlClientProvider } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";

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
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
          <Header />
          <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
          <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
