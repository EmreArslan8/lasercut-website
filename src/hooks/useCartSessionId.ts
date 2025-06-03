import { useEffect, useState } from "react";

// `cart_sess_id`'yi yönetmek için React-Cookie yerine native cookie yöntemleri ile
export function useCartSessionId() {
  const [cartSessionId, setCartSessionId] = useState<string | null>(null);

  // Çerezden cart_sess_id'yi dönen yardımcı fonksiyon
  function readCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return match ? match.split("=")[1] : null;
  }

  // Çereze cart_sess_id yazan yardımcı fonksiyon
  function writeCookie(name: string, value: string, days = 1) {
    if (typeof document === "undefined") return;
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; path=/; expires=${expires}`;
  }

  useEffect(() => {
    // 1) İlk render: önce çerezde cart_sess_id var mı diye bak
    const existing = readCookie("cart_sess_id");
    if (existing) {
      setCartSessionId(existing);
    } else {
      // 2) Yoksa, yeni bir ID üret
      const newId = generateCartSessionId();
      writeCookie("cart_sess_id", newId, 1); // 1 gün geçerli olsun
      setCartSessionId(newId);
    }
    // Bu effect yalnızca bir kez çalışır (başlangıçta)
  }, []);

  return cartSessionId;
}

// Aynı generateCartSessionId fonksiyonu:
function generateCartSessionId() {
  if (typeof window !== "undefined" && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  } else {
    return `cart_${Date.now()}`;
  }
}
