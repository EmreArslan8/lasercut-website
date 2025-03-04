import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // params artık bir Promise
}) {
  const resolvedParams = await params; // Promise çözülüyor
  const { locale } = resolvedParams;

 
  return (
    <html lang={locale}>
      <body style={{ margin: 0}}>
   <CartProvider >
          {children}
          </CartProvider>
      </body>
    </html>
  );
}
