import dynamic from "next/dynamic";

const CheckoutPageView = dynamic(() => import("./view"), { ssr: false });

const CheckoutPage = () => {
  return <CheckoutPageView />;
};

export default CheckoutPage;
