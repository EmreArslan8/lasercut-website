
import CheckoutPageView from './view';

const CheckoutPage = async () => {
  return <CheckoutPageView  />;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: '🛒',
};
export default CheckoutPage;
