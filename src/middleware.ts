import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Locale, locales } from './i18n';
// import { Region, regionalLanguages, regions } from './lib/shop/regions'; // 🌍 Region desteği devre dışı

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({ locales, defaultLocale: 'en' });
  let response = handleI18nRouting(request);

  const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean);
  const hasLocaleInURL = locales.includes(pathSegments[0] as Locale);
  // const hasRegionInURL = regions.includes(pathSegments[1] as Region); // 🌍 Region kontrolü iptal

  const detectedLocale =
    response.headers.get('x-middleware-request-x-next-intl-locale') ??
    request.cookies.get('NEXT_LOCALE')?.value;

  // const detectedRegion = hasRegionInURL
  //   ? (pathSegments[1] as Region)
  //   : request.cookies.get('NEXT_REGION')?.value;

  // let hasLocaleAndRegionMismatch = false;

  // const resolvedRegion = regions.includes(detectedRegion as any)
  //   ? (detectedRegion as Region)
  //   : 'uz'; // 🌍 Default region kaldırıldı

  const resolvedLocale: Locale = locales.includes(detectedLocale as Locale)
    ? (detectedLocale as Locale)
    : 'en';

  // if (!regionalLanguages[resolvedRegion].includes(resolvedLocale)) {
  //   resolvedLocale = regionalLanguages[resolvedRegion][0];
  //   hasLocaleAndRegionMismatch = true;
  // }

  // if (hasLocaleInURL && hasRegionInURL && !hasLocaleAndRegionMismatch) {
  if (hasLocaleInURL) {
    response.cookies.set('NEXT_LOCALE', resolvedLocale);
    // response.cookies.set('NEXT_REGION', resolvedRegion);
    return response;
  }

  // let slugPosition = 2;
  let slugPosition = hasLocaleInURL ? 1 : 0;
  // if (!hasLocaleInURL && !hasRegionInURL) slugPosition = 0;
  // else if (hasLocaleInURL && !hasRegionInURL) slugPosition = 1;

  const slug = pathSegments.length > slugPosition ? pathSegments.slice(slugPosition).join('/') : '';
  const searchParams = request.nextUrl.searchParams;
  const modifiedPath = `${request.nextUrl.origin}/${resolvedLocale}/${slug}${
    searchParams ? '?' + searchParams : ''
  }`;

  response = NextResponse.redirect(modifiedPath);
  response.cookies.set('NEXT_LOCALE', resolvedLocale);
  // response.cookies.set('NEXT_REGION', resolvedRegion);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
