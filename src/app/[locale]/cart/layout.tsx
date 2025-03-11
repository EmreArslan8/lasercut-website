
import CheckoutFooter from '@/components/Footer/CheckoutFooter';
import CheckoutHeader from '@/components/Header/checkout';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckoutHeader />
        {children}
      <CheckoutFooter />
    </>
  );
}
