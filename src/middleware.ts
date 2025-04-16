import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, Locale } from './i18n';

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static dosyalar ve Next.js özel yolları hariç tut
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Zaten URL'de bir locale varsa (örneğin /en/about)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    // Header'dan dili algıla
    const acceptLang = request.headers.get('accept-language');
    const preferredLang = acceptLang?.split(',')[0].split('-')[0] || 'en';

    const matchedLocale = locales.includes(preferredLang as Locale)
      ? preferredLang
      : 'en';

    const url = request.nextUrl.clone();
    url.pathname = `/${matchedLocale}${pathname}`;

    return NextResponse.redirect(url);
  }

  return createIntlMiddleware({
    locales,
    defaultLocale: 'en',
  })(request);
}

export const config = {
  matcher: ['/((?!_next|favicon_v2.ico|robots.txt|.*\\..*).*)'],
};
