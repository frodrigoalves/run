'use client';
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import FrasesOrbitais from '@/components/FrasesOrbitais';
import IconsDrift from '@/components/IconsDrift';
import GlobalControls from '@/components/global-controls';
import { LocalizationProvider } from '@/components/localization-provider';
import { useLocalization } from '@/hooks/use-localization';
import Link from 'next/link';

type LocaleSyncProps = { locale: string };

function LocalizationSync({ locale }: LocaleSyncProps) {
  const { changeLang } = useLocalization();
  useEffect(() => {
    const normalized = locale?.startsWith('pt') ? 'pt' : 'en';
    changeLang(normalized);
  }, [changeLang, locale]);
  return null;
}

export default function Landing() {
  const t = useTranslations('landing');
  const locale = useLocale();
  const normalizedLocale = locale?.startsWith('pt') ? 'pt' : 'en';

  return (
    <LocalizationProvider initialLang={normalizedLocale}>
      <LocalizationSync locale={locale} />
      <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-6 text-foreground">
        <h1 className="sr-only">{t('h1')}</h1>
        <div className="pointer-events-none absolute inset-0">
          <IconsDrift />
          <FrasesOrbitais />
        </div>
        <div className="absolute top-4 right-4 z-20">
          <GlobalControls />
        </div>
        <Link
          href={`/${locale}/home`}
          aria-label={t('cta')}
          className="pointer-events-auto relative z-10 inline-flex flex-col items-center gap-2 rounded-full border border-border/60 bg-background/70 px-8 py-4 text-center shadow-lg backdrop-blur-md transition hover:border-accent/60 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="text-xs font-medium uppercase tracking-[0.5em] text-muted-foreground">{t('ctaPrefix')}</span>
          <span className="text-lg font-semibold uppercase tracking-[0.3em] text-foreground">{t('cta')}</span>
        </Link>
      </main>
    </LocalizationProvider>
  );
}
