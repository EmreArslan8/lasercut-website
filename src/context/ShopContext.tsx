"use client";

import { useCartSessionId } from "@/lib/hooks/useCartSessionId";
import { uploadFileToSupabase } from "@/utils/uploadFile";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  fileName: string;
  material: string;
  thickness: string;
  quantity: number;
  coating: string;
  note?: string;
  file?: File;
  fileUrl?: string | null;
  extraServices?: string[];
  svg?: string;
  priceTL?: string;
  priceUSD?: string;
  dimensions?: { 
    width: string;
    height: string;
    unit: "mm" | "inch";
  };
  updatedAt?: string; // ISO formatında tarih
}

export interface ShopContextProps {
  cartItems: CartItem[];
  setCartItems: (
    update: CartItem[] | ((prevItems: CartItem[]) => CartItem[])
  ) => void;
  addToCart: (item: CartItem) => Promise<void>;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  updateCart: (updatedItems: CartItem[]) => void;
  selectedItems: string[];
  toggleSelectItem: (id: string) => void;
  getSelectedItems: () => CartItem[];
  proceedToCheckout: () => Promise<string | null>;
  checkoutItems: CartItem[];
  clearCheckout: () => void;
  updateCartItem: (tempId: string, updatedFields: Partial<CartItem>) => void;
  fetchCartFromAPI: (cartSessId: string) => Promise<void>;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const cartSessionId = useCartSessionId();

  // İlk yüklemede, localStorage'deki verileri okuyoruz.
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItemsState(JSON.parse(storedCart));
    }
    if (cartSessionId) {
      fetchCartFromAPI(cartSessionId);
    }
  }, [cartSessionId]);

  const fetchCartFromAPI = async (cartSessId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/cart/get?cart_sess_id=${cartSessId}`);
      const data = await response.json();
      if (data.success) {
        console.log("✅ API'den Güncellenmiş Sepet Verisi:", data.items);
        // Ek olarak, her ürünün updatedAt alanını kontrol ederek,
        // eğer API'den gelen veri daha güncelse onu kullanabilirsiniz.
        setCartItemsState(data.items);
        localStorage.setItem("cart", JSON.stringify(data.items));
      } else {
        console.error("🚨 API Hatası:", data.message);
      }
    } catch (error) {
      console.error("🚨 API Hata:", error);
    }
  };

  const setCartItems = (
    update: CartItem[] | ((prevItems: CartItem[]) => CartItem[])
  ) => {
    setCartItemsState((prevItems) => {
      let updatedItems: CartItem[];
      if (typeof update === "function") {
        updatedItems = (update as (p: CartItem[]) => CartItem[])(prevItems);
      } else {
        updatedItems = update;
      }
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const addToCart = async (item: CartItem): Promise<void> => {
    if (!cartSessionId) {
      console.error("🚨 Sepet ID'si bulunamadı!");
      return;
    }

    let fileUrl = item.fileUrl || null;
    if (item.file) {
      fileUrl = null;
    }

    // Geçici ID (optimistik UI için)
    const tempId = `temp-${Date.now()}`;
    const optimisticCartItem: CartItem = { 
      ...item, 
      fileUrl, 
      id: tempId,
      updatedAt: new Date().toISOString(),
    };

    // Optimistik ekleme: UI hemen güncelleniyor
    setCartItems((prevItems) => [...prevItems, optimisticCartItem]);

    try {
      // API çağrısı: Veritabanı auto-increment id üretecek
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...optimisticCartItem, cart_sess_id: cartSessionId }),
      });
      const data = await response.json();

      if (data.success) {
        console.log(`✅ Sepete eklendi: ${data.data.id}`);
        // Optimistik öğe, gerçek id ile güncelleniyor.
        setCartItems((prevItems) =>
          prevItems.map((i) =>
            i.id === tempId ? { ...i, id: data.data.id, updatedAt: new Date().toISOString() } : i
          )
        );
      } else {
        console.error("❌ API Hatası:", data.message);
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== tempId));
      }
    } catch (error) {
      console.error("🚨 API Hatası:", error);
      setCartItems((prevItems) => prevItems.filter((i) => i.id !== tempId));
    }

    if (item.file) {
      uploadFileToSupabase(item.file)
        .then((uploadedUrl) => {
          setCartItems((prevItems) =>
            prevItems.map((i) =>
              i.id === tempId ? { ...i, fileUrl: uploadedUrl, updatedAt: new Date().toISOString() } : i
            )
          );
        })
        .catch((err) => {
          console.error("Dosya yükleme hatası:", err);
          setCartItems((prevItems) =>
            prevItems.map((i) =>
              i.id === tempId ? { ...i, fileUrl: "upload_failed", updatedAt: new Date().toISOString() } : i
            )
          );
        });
    }
  };

  const clearCart = () => {
    setCartItemsState([]);
    setSelectedItems([]);
    setCheckoutItems([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItems");
  };

  const removeFromCart = async (id?: string) => {
    if (!id) {
      console.error("🚨 Silme işlemi başarısız: ID eksik!");
      return;
    }

    const previousCart = [...cartItems];
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    try {
      console.log(`🗑 Ürün Siliniyor: ${id}`);
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (!data.success) {
        console.error("🚨 API Hatası:", data.message);
        setCartItems(() => [...previousCart]);
      } else {
        console.log(`✅ Ürün Başarıyla Silindi: ${id}`);
      }
    } catch (error) {
      console.error("🚨 API Silme Hatası:", error);
      setCartItems(() => [...previousCart]);
    }
  };

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItemsState(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      console.log("Seçili Ürünler Güncellendi:", updated);
      return updated;
    });
  };

  const getSelectedItems = () => cartItems.filter((item) => selectedItems.includes(item.id));

  const proceedToCheckout = async (): Promise<string | null> => {
    const selectedProducts = getSelectedItems();
    if (selectedProducts.length === 0) {
      console.error("🚨 Ödeme için seçili ürün yok!");
      return null;
    }
    localStorage.setItem("selectedCartItems", JSON.stringify(selectedProducts));
    try {
      console.log("📡 API'ye Checkout isteği atılıyor...");
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selectedProducts.map((item) => item.id) }),
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return data.checkoutId || null;
      } catch (error) {
        console.error("🚨 JSON Parse Hatası! API Yanıtı HTML olabilir.");
        return null;
      }
    } catch (error) {
      console.error("🚨 API Checkout Hatası:", error);
      return null;
    }
  };

  const clearCheckout = () => {
    setCheckoutItems([]);
  };

  const updateCartItem = (tempId: string, updatedFields: Partial<CartItem>) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === tempId ? { ...item, ...updatedFields } : item
      )
    );
  };

  const contextValue: ShopContextProps = {
    cartItems,
    setCartItems,
    addToCart,
    clearCart,
    removeFromCart,
    updateCart,
    selectedItems,
    toggleSelectItem,
    getSelectedItems,
    proceedToCheckout,
    checkoutItems,
    clearCheckout,
    updateCartItem,
    fetchCartFromAPI,
  };

  return (
    <ShopContext.Provider value={contextValue}>
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
