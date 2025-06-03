"use client";

import useScreen from "@/hooks/useScreen";
import DesktopCart from "./DesktopCart";
import Loading from "./loading";
import MobileCart from "./MobileCart";

const CartPageView = () => {
  const { isMobile } = useScreen();

  return (
    <>
      <Loading />
      {isMobile ? <MobileCart /> : <DesktopCart />}
    </>
  );
};

export default CartPageView;
