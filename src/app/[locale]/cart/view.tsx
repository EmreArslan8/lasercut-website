"use client";

import useScreen from "@/lib/hooks/useScreen";
import MobileCart from "./MobileCart";
import DesktopCart from "./DesktopCart";
import Loading from "./loading"; // ✅ Loading bileşenini import ettik

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
