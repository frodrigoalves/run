
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
import { useEffect, useState, useMemo } from 'react';
import TopBar from '@/components/top-bar';
import { ControlsHint } from '@/components/controls-hint';

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

  const [namePosition, setNamePosition] = useState({ top: '30%', left: '50%', transform: 'translateX(-50%)' });
  const [arrowStyle, setArrowStyle] = useState({ transform: 'rotate(90deg)' });

  const arrowCharacters = useMemo(() => ['↓', '→', '↘', '↙', '←', '↖', '↗'], []);

  useEffect(() => {
    const updatePositions = () => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
      
      const top = 50 + (Math.sin(angle) * (radius / window.innerHeight) * 100);
      const left = 50 + (Math.cos(angle) * (radius / window.innerWidth) * 100);

      setNamePosition({
        top: `${top}%`,
        left: `${left}%`,
        transform: 'translate(-50%, -50%)'
      });

      // Point arrow towards the name
      const arrowAngle = angle * (180 / Math.PI) + 90; // +90 to point from center
      setArrowStyle({
        transform: `rotate(${arrowAngle}deg)`
      });
    };

    updatePositions(); 
    const interval = setInterval(updatePositions, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <div className='relative z-50 pt-4'>
        <TopBar showNav={false} />
        <ControlsHint />
      </div>
      <Hero />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-8 w-full max-w-xs">
        
        <div 
           className="absolute z-20 transition-all duration-1000 ease-in-out"
           style={{...namePosition}}
        >
           <MatrixEffect
            strings={["Rodrigo Alves"]}
            isFeatured={true}
            loopAfter={3800}
            stopAfter={3500}
          />
        </div>
        
        <div className='relative w-full h-10 flex items-center justify-center'>
             <div className="absolute transition-transform duration-1000 ease-in-out" style={arrowStyle}>
                <MatrixEffect 
                  strings={arrowCharacters}
                  isFeatured={true}
                  className="text-2xl font-sans"
                  loopAfter={3800}
                  stopAfter={3500}
                />
             </div>
        </div>

        <div className="w-56 h-12">
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
