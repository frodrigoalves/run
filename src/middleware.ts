import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'pt-BR'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-BR|en)/:path*']
};