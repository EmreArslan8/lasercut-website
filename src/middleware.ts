import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Eğer admin path'ine erişim varsa, locale eklenmesini engelle
  if (url.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Diğer sayfalar için next-intl middleware'i çalıştır
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/admin/:path*'], // '/admin' path'ini kontrol ediyoruz
};
