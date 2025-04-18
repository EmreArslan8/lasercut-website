import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Locale, locales } from './i18n';

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({ locales, defaultLocale: 'en' });
  let response = handleI18nRouting(request);

  const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean);
  const hasLocaleInURL = locales.includes(pathSegments[0] as Locale);

  const detectedLocale =
    response.headers.get('x-middleware-request-x-next-intl-locale') ??
    request.cookies.get('NEXT_LOCALE')?.value ??
    'en';

  const resolvedLocale = locales.includes(detectedLocale as any)
    ? (detectedLocale as Locale)
    : 'en';

  if (hasLocaleInURL) {
    response.cookies.set('NEXT_LOCALE', resolvedLocale);
    return response;
  }

  const slug = pathSegments.length > 0 ? pathSegments.join('/') : '';
  const searchParams = request.nextUrl.searchParams;
  const modifiedPath = `${request.nextUrl.origin}/${resolvedLocale}${slug ? '/' + slug : ''}${
    searchParams.toString() ? '?' + searchParams.toString() : ''
  }`;

  response = NextResponse.redirect(modifiedPath);
  response.cookies.set('NEXT_LOCALE', resolvedLocale);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
