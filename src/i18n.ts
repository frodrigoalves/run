import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'pt'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});