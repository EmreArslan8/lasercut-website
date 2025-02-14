"use client";

import { createContext, useContext, useState, useEffect } from "react";

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

interface CartContextProps {
  cartItems: CartItem[];
  setCartItems: (callback: (prevItems: CartItem[]) => CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (index: number) => void; // Yeni eklenen işlev
  updateCart: (updatedItems: CartItem[]) => void; // Yeni eklenen işlev
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

  // Sepet öğesi ekle
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Sepeti temizle
  const clearCart = () => {
    setCartItemsState([]);
    localStorage.removeItem("cart");
  };

  // Tek ürün sil
  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Sepet öğelerini güncelle
  const updateCart = (updatedItems: CartItem[]) => {
    setCartItemsState(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, clearCart, removeFromCart, updateCart }}
    >
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
