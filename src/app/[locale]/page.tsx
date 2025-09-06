'use client';
import { useTranslations } from 'next-intl';
import FrasesOrbitais from '@/components/FrasesOrbitais';
import IconsDrift from '@/components/IconsDrift';
import Link from 'next/link';

export default function Landing() {
  const t = useTranslations('landing');
  return (
    <main className="relative min-h-[100svh] flex items-center justify-center bg-background text-foreground">
      <h1 className="sr-only">{t('h1')}</h1>
      <IconsDrift />
      <FrasesOrbitais />
      <Link
        href="/test"
        aria-label={t('cta')}
        className="pointer-events-auto relative z-10 inline-flex items-center gap-2 rounded-md border px-6 py-3 bg-background/60 backdrop-blur-sm hover:bg-accent/70 transition focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t('cta')}
      </Link>
    </main>
  );
}
