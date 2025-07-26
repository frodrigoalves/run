'use client';
import { LocalizationProvider } from '@/components/localization-provider';
import { MatrixEffect } from '@/components/matrix-effect';
import Hero from '@/components/sections/hero';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/use-localization';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function LandingPageContent() {
  const { t, lang } = useLocalization();

  const buttonText = {
    pt: ['Explorar Portfólio'],
    en: ['Explore Portfolio'],
  };

  return (
    <div className="flex min-h-screen flex-col relative">
      <Hero />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/70 hover:text-accent-foreground animate-fade-in-delay-4 opacity-0 px-6 h-12">
          <Link href="/home" className="flex items-center gap-2">
            <MatrixEffect 
              strings={buttonText[lang]}
              isFeatured={true}
              className="text-base font-sans"
            />
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <LocalizationProvider>
      <LandingPageContent />
    </LocalizationProvider>
  );
}
