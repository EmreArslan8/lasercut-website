"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  fileName: string;
  material: string;
  thickness: string;
  quantity: number;
  note?: string; // Opsiyonel not
  file?: File; // Dosya eklenebilir
  fileUrl?: string; // Dosya URL'si (opsiyonel)
}

interface CartContextProps {
  cartItems: CartItem[];
  setCartItems: (callback: (prevItems: CartItem[]) => CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);

  // LocalStorage'dan sepeti yükle
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as CartItem[];

      // Fiziksel dosyaları yeniden oluşturmak için bir kontrol ekle
      const cartWithFilesRestored = parsedCart.map((item) => ({
        ...item,
        file: item.file ? new File([], item.fileName) : undefined, // Dosyayı yeniden oluştur
      }));

      setCartItemsState(cartWithFilesRestored);
    }
  }, []);

  // LocalStorage'a kaydet
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
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
