"use client"


import useScreen from "@/lib/hooks/useScreen";
import MobileCart from "./components/MobileCart";
import DesktopCart from "./components/DesktopCart";

const Cart = () => {
  const { isMobile } = useScreen();

  return isMobile ? <MobileCart /> : <DesktopCart />;
};

export default Cart;
