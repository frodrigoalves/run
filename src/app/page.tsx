
'use client';
import { LocalizationProvider } from '@/components/localization-provider';
import { MatrixEffect } from '@/components/matrix-effect';
import Hero from '@/components/sections/hero';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/use-localization';
import Link from 'next/link';
import { HeroAnimationProvider, useHeroAnimation } from '@/contexts/hero-animation-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TopBar from '@/components/top-bar';
import { ControlsHint } from '@/components/controls-hint';
import { cn } from '@/lib/utils';

type NamePosition = 'top' | 'bottom';

function LandingPageContent() {
  const { lang } = useLocalization();
  const { startSync, isSyncing } = useHeroAnimation();
  const router = useRouter();
  const [namePosition, setNamePosition] = useState<NamePosition>('top');

  const buttonText = {
    pt: 'Explorar Portfólio',
    en: 'Explore Portfolio',
  };

  const arrowCharsUp = ['↑', '⇡', '⇧'];
  const arrowCharsDown = ['↓', '⇣', '⇓', 'V'];

  useEffect(() => {
    const interval = setInterval(() => {
      setNamePosition(prev => (prev === 'top' ? 'bottom' : 'top'));
    }, 5000); // Change position every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startSync('ACESSO AUTORIZADO');
  };

  useEffect(() => {
    if (isSyncing) {
      setTimeout(() => {
        router.push('/home');
      }, 2000); // Wait for sync animation to complete
    }
  }, [isSyncing, router]);


  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <div className='relative z-50 pt-4'>
        <TopBar showNav={false} />
        <ControlsHint />
      </div>
      <Hero />
       <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center gap-8",
          namePosition === 'top' ? 'flex-col' : 'flex-col-reverse'
       )}>
        <div className="opacity-0 animate-fade-in-delay-1">
           <MatrixEffect
            strings={["Rodrigo Alves"]}
            isFeatured={true}
            loopAfter={5000}
            stopAfter={4000}
          />
        </div>
        <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/70 hover:text-accent-foreground animate-fade-in-delay-4 opacity-0 px-6 h-12 w-56 justify-center">
          <Link href="/home" onClick={handleClick} className="flex items-center gap-2">
            <MatrixEffect 
              strings={[buttonText[lang]]}
              isFeatured={true}
              stopAfter={4000}
              loopAfter={5000}
              className="text-base font-sans"
            />
             <MatrixEffect 
              key={namePosition} // Re-trigger animation on position change
              strings={[namePosition === 'top' ? '↑' : '↓']}
              isFeatured={true}
              stopAfter={4000}
              loopAfter={5000}
              characterSet={namePosition === 'top' ? arrowCharsUp : arrowCharsDown}
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
        <HeroAnimationProvider>
          <LandingPageContent />
        </HeroAnimationProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
