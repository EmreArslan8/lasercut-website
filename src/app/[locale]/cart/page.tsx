import { getTranslations } from 'next-intl/server';
import CartPageView from './view';

const CartPage = async () => {
  return <CartPageView />;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  const t = await getTranslations({ locale: params.locale, namespace: 'common' });

  return {
    title: t('cartPage.metadata.title'),
    description: t('cartPage.metadata.description'),
  };
};


export default CartPage;
