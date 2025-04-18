// lib/cart/useCartSessionId.ts
'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useCartSessionId(): string | null {
  const [cartSessionId, setCartSessionId] = useState<string | null>(null);

  useEffect(() => {
    let id = Cookies.get('cart_sess_id');

    if (!id) {
      id = generateCartSessionId();
      Cookies.set('cart_sess_id', id, { expires: 1 }); // 1 gün geçerli
    }

    setCartSessionId(id);
  }, []);

  return cartSessionId;
}

function generateCartSessionId(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }
  return `cart_${Date.now()}`;
}
