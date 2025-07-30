
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
import { useEffect } from 'react';
import TopBar from '@/components/top-bar';
import { ControlsHint } from '@/components/controls-hint';
import { cn } from '@/lib/utils';


function LandingPageContent() {
  const { t } = useLocalization();
  const { startSync, isSyncing } = useHeroAnimation();
  const router = useRouter();
  
  const buttonText = {
    pt: 'Explorar Portifólio',
    en: 'Explore Portfolio',
  };

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
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-8 w-full max-w-xs">
        
        <div className="opacity-0 animate-fade-in-delay-1">
           <MatrixEffect
            strings={["Rodrigo Alves"]}
            isFeatured={true}
          />
        </div>
        
        <div className='relative w-full h-10 flex items-center justify-center opacity-0 animate-fade-in-delay-2'>
             <MatrixEffect 
              strings={['↓']}
              isFeatured={true}
              className="text-2xl font-sans"
            />
        </div>

        <div className="opacity-0 animate-fade-in-delay-3 w-56 h-12">
            <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/70 hover:text-accent-foreground w-full h-full">
              <Link href="/home" onClick={handleClick} className="flex items-center gap-2">
                <MatrixEffect 
                  strings={[t(buttonText)]}
                  isFeatured={true}
                  className="text-base font-sans"
                />
              </Link>
            </Button>
        </div>
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
