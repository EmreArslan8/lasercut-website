"use client"

import useScreen from "@/lib/hooks/useScreen";
import MobileCart from "./MobileCart";
import DesktopCart from "./DesktopCart";

const Cart = () => {
  const { isMobile } = useScreen();

  return isMobile ? <MobileCart /> : <DesktopCart />;
};

export default Cart;
