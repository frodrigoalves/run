'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { LandingProvider, useLanding } from '@/context/LandingContext';
import DecodingDataCarousel from '@/components/DecodingDataCarousel';
import EnterSiteButton from '@/components/EnterSiteButton';
import ThemeSelector from '@/components/ThemeSelector';
import LanguageSelector from '@/components/LanguageSelector';

function LandingContent() {
  const t = useTranslations('landing');
  const router = useRouter();
  const locale = useLocale();
  const { globalDecode } = useLanding();

  useEffect(() => {
    if (globalDecode) {
      const timer = setTimeout(() => {
        router.push(`/${locale}/home`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [globalDecode, router, locale]);

  return (
    <main className="relative min-h-[100svh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <h1 className="sr-only">{t('h1')}</h1>

      <nav className="fixed top-3 right-3 z-50 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/20 p-1.5 shadow-[0_14px_30px_rgba(15,23,42,0.28)] backdrop-blur-xl">
        <LanguageSelector />
        <ThemeSelector />
      </nav>

      <DecodingDataCarousel />

      <EnterSiteButton />
    </main>
  );
}

export default function Landing() {
  return (
    <LandingProvider>
      <LandingContent />
    </LandingProvider>
  );
}
