"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface CartItem {
  fileName: string;
  material: string;
  thickness: string;
  quantity: number;
  coating: string;
  note?: string;
  file?: File;
  fileUrl?: string;
  extraServices?: string[];
  svg?: string;
  priceTL?: string;
  priceUSD?: string;
  dimensions?: {
    width: string;
    height: string;
    unit: "mm" | "inch";
  };
}

interface ShopContextProps {
  cartItems: CartItem[];
  setCartItems: (callback: (prevItems: CartItem[]) => CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (index: number) => void;
  updateCart: (updatedItems: CartItem[]) => void;
  selectedItems: number[];
  toggleSelectItem: (index: number) => void;
  toggleSelectAll: () => void;
  getSelectedItems: () => CartItem[];
  proceedToCheckout: () => void;
  checkoutItems: CartItem[];
  clearCheckout: () => void; 
}


const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as CartItem[];
      setCartItemsState(parsedCart);
    }
  }, []);

  const setCartItems = (callback: (prevItems: CartItem[]) => CartItem[]) => {
    setCartItemsState((prevItems) => {
      const updatedItems = callback(prevItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const clearCart = () => {
    setCartItemsState([]);
    setSelectedItems([]);
    setCheckoutItems([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItems");
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setSelectedItems((prev) => prev.filter((i) => i !== index));
  };

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItemsState(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const toggleSelectItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems((prev) => (prev.length === cartItems.length ? [] : cartItems.map((_, i) => i)));
  };

  const getSelectedItems = () => selectedItems.map((i) => cartItems[i]);

  const proceedToCheckout = () => {
    const selectedProducts = getSelectedItems();
    setCheckoutItems(selectedProducts);
    localStorage.setItem("checkoutItems", JSON.stringify(selectedProducts));
  };

  const clearCheckout = () => {
    setCheckoutItems([]);
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        clearCart,
        removeFromCart,
        updateCart,
        selectedItems,
        toggleSelectItem,
        toggleSelectAll,
        getSelectedItems,
        proceedToCheckout,
        checkoutItems,
        clearCheckout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
