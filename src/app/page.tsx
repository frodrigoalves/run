'use client';
import { LocalizationProvider } from '@/components/localization-provider';
import GlobalControls from '@/components/global-controls';
import { MatrixEffect } from '@/components/matrix-effect';
import Hero from '@/components/sections/hero';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/use-localization';
import Link from 'next/link';

function LandingPageContent() {
  const { lang } = useLocalization();

  const buttonText = {
    pt: 'Explorar Portfólio',
    en: 'Explore Portfolio',
  };

  const arrowChars = ['→', '»', '⇒', '>'];

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
       <GlobalControls />
      <Hero />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/70 hover:text-accent-foreground animate-fade-in-delay-4 opacity-0 px-6 h-12 w-48 justify-center">
          <Link href="/home" className="flex items-center gap-2">
            <MatrixEffect 
              strings={[buttonText[lang]]}
              isFeatured={true}
              stopAfter={3000}
              loopAfter={5000}
              className="text-base font-sans"
            />
             <MatrixEffect 
              strings={['→']}
              isFeatured={true}
              stopAfter={3000}
              loopAfter={5000}
              characterSet={arrowChars}
              className="text-base font-sans"
            />
          </Link>
        </Button>
      </div>
    </div>
  );
}


export default function LandingPage() {
  return (
    <LocalizationProvider>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
        <LandingPageContent />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
