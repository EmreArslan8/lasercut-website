"use client";

import { setCookie } from "cookies-next";
import { Locale } from "next-intl";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const useLocale = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams() as { locale: Locale };

  const changeLanguage = (locale: Locale) => {
    setCookie("NEXT_LOCALE", locale);
    window.location.href = `${
      process.env.NEXT_PUBLIC_HOST_URL
    }/${locale}/${pathname}?${searchParams?.toString()}`;
  };

  return {
    locale,
    changeLanguage,
  };
};

export default useLocale;
