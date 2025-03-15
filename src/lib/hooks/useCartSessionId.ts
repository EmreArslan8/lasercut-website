import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// `cart_sess_id`'yi yönetmek için hook
export function useCartSessionId() {
  const [cookies, setCookie] = useCookies(["cart_sess_id"]);
  const [cartSessionId, setCartSessionId] = useState<string | null>(
    cookies.cart_sess_id || null // ✅ İlk değer olarak çerezi kullan
  );

  useEffect(() => {
    if (!cookies.cart_sess_id) {
      const newCartSessionId = generateCartSessionId();
      setCookie("cart_sess_id", newCartSessionId, { maxAge: 24 * 60 * 60, path: "/" });
      setCartSessionId(newCartSessionId);
    }
  }, [cookies, setCookie]);

  return cartSessionId;
}

// Benzersiz `cart_sess_id` oluşturma fonksiyonu
function generateCartSessionId() {
  if (typeof window !== "undefined" && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } else {
    return `cart_${Date.now()}`;
  }
}
