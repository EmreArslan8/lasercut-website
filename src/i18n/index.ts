import deepmerge from 'deepmerge';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const getMessages = async (locale: Locale = 'en') => {
  const defaultMessages = {
    common: (await import('./dictionaries/en/common.json')).default,
    shop: (await import('./dictionaries/en/shop.json')).default,
    categories: (await import('./dictionaries/en/categories.json')).default,
  };

  const userMessages = {
    common: (await import(`./dictionaries/${locale}/common.json`)).default,
    shop: (await import(`./dictionaries/${locale}/shop.json`)).default,
    categories: (await import(`./dictionaries/${locale}/categories.json`)).default,
  };

  const messages = deepmerge(defaultMessages, userMessages);
  return messages;
};

// `next-intl` konfigürasyonu
export default getRequestConfig(async ({ locale = 'en' }) => ({
  messages: await getMessages(locale as Locale),
}));

// next-intl navigation yardımcıları
const {
  useRouter: nextIntlUseRouter,
  usePathname: nextIntlUsePathname,
  ...rest
} = createSharedPathnamesNavigation({
  locales,
});

// export edilen fonksiyonlar
export const { Link, redirect } = rest;

// locale'den sonraki path'i verir → /en/slug → slug
export const usePathname = () => nextIntlUsePathname().slice(3);

// Router push/replace override — region olmadan
export const useRouter = () => {
  const { push: _push, replace: _replace, back, forward, refresh } = nextIntlUseRouter();

  const push = (href: string, options?: { locale?: Locale }) => {
    if (href.startsWith('http')) {
      window.location.href = href;
      return;
    }
    _push(href, options); // ✅ sadece locale yönlendirmesi
  };

  const replace = (href: string, options?: { locale?: Locale }) => {
    if (href.startsWith('http')) {
      window.location.href = href;
      return;
    }
    _replace(href, options); // ✅ sadece locale yönlendirmesi
  };

  return { push, replace, back, forward, refresh };
};
