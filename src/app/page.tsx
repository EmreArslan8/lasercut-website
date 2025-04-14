// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const lang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    router.replace(`/${lang}`);
  }, []);

  return null; // veya loading animasyonu
}
