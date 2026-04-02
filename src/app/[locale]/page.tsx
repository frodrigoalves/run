'use client';

import { useTranslations } from 'next-intl';
import { LandingProvider } from '@/context/LandingContext';
import DecodingDataCarousel from '@/components/DecodingDataCarousel';
import EnterSiteButton from '@/components/EnterSiteButton';
import ThemeSelector from '@/components/ThemeSelector';
import LanguageSelector from '@/components/LanguageSelector';

export default function Landing() {
  const t = useTranslations('landing');

  return (
    <LandingProvider>
      <main className="relative min-h-[100svh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
        <h1 className="sr-only">{t('h1')}</h1>

        <nav className="fixed top-5 right-5 z-50 flex items-center gap-2">
          <LanguageSelector />
          <ThemeSelector />
        </nav>

        <DecodingDataCarousel />

        <EnterSiteButton />
      </main>
    </LandingProvider>
  );
}
