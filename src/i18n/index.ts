
import deepmerge from "deepmerge";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];



export const getMessages = async (locale: Locale = "en") => {
  const defaultMessages = {
    common: (await import("./dictionaries/en/common.json")).default,
    shop: (await import("./dictionaries/en/shop.json")).default,
    categories: (await import("./dictionaries/en/categories.json")).default,
  };

  const userMessages = {
    common: (await import(`./dictionaries/${locale}/common.json`)).default,
    shop: (await import(`./dictionaries/${locale}/shop.json`)).default,
    categories: (await import(`./dictionaries/${locale}/categories.json`)).default,
  };

  return deepmerge(defaultMessages, userMessages);
};

export default getRequestConfig(async ({ locale = "en" }) => ({
  messages: await getMessages(locale as Locale),
}));

const {
  useRouter: nextIntlUseRouter,
  usePathname: nextIntlUsePathname,
  ...rest
} = createSharedPathnamesNavigation({ locales });

export const { Link, redirect } = rest;

export const usePathname = () => nextIntlUsePathname().slice(3);

export const useRouter = () => {
  const { push: _push, replace: _replace, back, forward, refresh } = nextIntlUseRouter();

  const push = (href: string, options?: { locale?: Locale }) => {
    if (href.startsWith("http")) {
      window.location.href = href;
      return;
    }
    _push(`/${options?.locale ?? "en"}${href}`, options);
  };

  const replace = (href: string, options?: { locale?: Locale }) => {
    if (href.startsWith("http")) {
      window.location.href = href;
      return;
    }
    _replace(`/${options?.locale ?? "en"}${href}`, options);
  };

  return { push, replace, back, forward, refresh };
};
