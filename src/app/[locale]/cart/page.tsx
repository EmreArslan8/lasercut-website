import { Locale } from "@/i18n";
import { Metadata } from "next";
import CartPageView from "./view";

export async function generateMetadata(props: any): Promise<Metadata> {
  const { locale } = props.params as { locale: Locale };
  const base = 'https://www.2dtocut.com';
  const slug = 'cart';

  return {
    title: '🛒 Shopping Cart | CNC Laser Parts | 2dtocut',
    description: 'Review your cart, update quantities, and checkout easily with our CNC laser cutting solutions. Fast delivery, precision cuts. Get a free quote today!',
    alternates: {
      canonical: `${base}/${locale}/${slug}`,
      languages: {
        en: `${base}/en/${slug}`,
        tr: `${base}/tr/${slug}`,
        'x-default': `${base}/en/${slug}`,
      },
    },
  };
}


export default function CartPage() {
  return <CartPageView />;
}