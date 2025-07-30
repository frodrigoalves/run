'use client';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FrasesOrbitais from '@/components/FrasesOrbitais';
import IconsDrift from '@/components/IconsDrift';

// This is a workaround for a bug in next-intl.
// We can remove this when the bug is fixed.
// https://github.com/amannn/next-intl/issues/833
//
// Also, we have to catch the error and render a 404 page
// because the useTranslations hook throws an error when the
// messages are not found, and this will cause an infinite
// loop in the rendering of the page.
function useSafeTranslations(
  ...args: Parameters<typeof useTranslations>
): ReturnType<typeof useTranslations> {
  try {
    return useTranslations(...args);
  } catch (e: any) {
    if (e.message.includes('MISSING_MESSAGE')) {
      notFound();
    }
    throw e;
  }
}

export default function Landing() {
  const t = useSafeTranslations('landing');
  return (
    <main className="relative min-h-[100svh] flex items-center justify-center bg-background text-foreground">
      <h1 className="sr-only">{t('h1')}</h1>
      <IconsDrift />
      <FrasesOrbitais />
      <a
        href="/home"
        aria-label={t('cta')}
        className="pointer-events-auto relative z-10 inline-flex items-center gap-2 rounded-md border px-6 py-3 bg-background/60 backdrop-blur-sm hover:bg-accent/70 transition focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t('cta')}
      </a>
    </main>
  );
}
