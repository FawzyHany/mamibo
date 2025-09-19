// import createMiddleware from 'next-intl/middleware';
// import {NextRequest} from 'next/server';
 
// export default async function middleware(request: NextRequest) {
//   // Step 1: Use the incoming request (example)
//   const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
 
//   // Step 2: Create and call the next-intl middleware (example)
//   const handleI18nRouting = createMiddleware({
//     locales: ['en', 'ar'],
//     defaultLocale: 'en'
//   });
//   const response = handleI18nRouting(request);
 
//   // Step 3: Alter the response (example)
//   response.headers.set('x-your-custom-locale', defaultLocale);
 
//   return response;
// }
 
// export const config = {
//   matcher: [
//     '/((?!_next|api|static|.*\\..*|en|ar).*)'
//   ],
// }

// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create next-intl middleware
const nextIntlMiddleware = createMiddleware(routing);

// Set your default locale
const defaultLocale = routing.defaultLocale ?? 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[middleware] Incoming request:', pathname);

  // Custom redirect: Only if visiting the root path
  if (pathname === '/') {
    const redirectUrl = new URL(`/${defaultLocale}`, request.url);

    return NextResponse.redirect(redirectUrl);
  }

  // Let next-intl handle everything else
  return nextIntlMiddleware(request);
}

// Middleware config — matches all routes except static files and APIs
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
