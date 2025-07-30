
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
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import TopBar from '@/components/top-bar';
import { ControlsHint } from '@/components/controls-hint';

function LandingPageContent() {
  const { t } = useLocalization();
  const { startSync, isSyncing } = useHeroAnimation();
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

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

  const [namePosition, setNamePosition] = useState({ top: '30%', left: '50%' });
  const [arrowStyle, setArrowStyle] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const arrowCharacters = useMemo(() => ['↓', '→', '↘', '↙', '←', '↖', '↗', '↓'], []);

  const updatePositions = useCallback(() => {
      if (!isClient || !buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.top + buttonRect.height / 2;

      // Reduced radius to keep the name within viewport, with a larger buffer
      const radiusX = (window.innerWidth / 2) - 250; 
      const radiusY = (window.innerHeight / 2) - 150;
      
      const angle = Math.random() * 2 * Math.PI;
      const targetX = window.innerWidth / 2 + Math.cos(angle) * radiusX;
      const targetY = window.innerHeight / 2 + Math.sin(angle) * radiusY;

      setNamePosition({
        top: `${targetY}px`,
        left: `${targetX}px`,
      });
      
      const deltaX = targetX - startX;
      const deltaY = targetY - startY;
      const arrowAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const arrowLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      setArrowStyle({
        width: `${arrowLength}px`,
        transform: `rotate(${arrowAngle}deg)`,
        top: `${startY}px`,
        left: `${startX}px`,
      });
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    updatePositions();
    
    const interval = setInterval(updatePositions, 4000);

    return () => clearInterval(interval);
  }, [isClient, updatePositions]);

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <div className='relative z-50 pt-4'>
        <TopBar showNav={false} />
        <ControlsHint />
      </div>
      <Hero />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-8 w-full max-w-xs">
        
        <div 
           className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
           style={{...namePosition, transition: 'top 1s ease-in-out, left 1s ease-in-out'}}
        >
           <MatrixEffect
            strings={["Rodrigo Alves"]}
            isFeatured={true}
            stopAfter={3800}
            loopAfter={4000}
            showOnlyWhenComplete={true}
          />
        </div>
        
        <div ref={buttonRef} className="relative w-56 h-12">
            <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/70 hover:text-accent-foreground w-full h-full">
              <Link href="/home" onClick={handleClick} className="flex items-center gap-2">
                <MatrixEffect 
                  strings={[t(buttonText)]}
                  isFeatured={true}
                  className="text-base font-sans"
                  stopAfter={2000}
                  loopAfter={5000}
                />
              </Link>
            </Button>
        </div>
      </div>
       
      <div 
        className='absolute h-px flex items-center' 
        style={{
            transformOrigin: 'left center', 
            ...arrowStyle,
            transition: 'width 1s ease-in-out, transform 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out'
        }}
      >
          <MatrixEffect 
            strings={arrowCharacters}
            isFeatured={true}
            className="text-2xl font-sans w-full"
            stopAfter={3800}
            loopAfter={4000}
          />
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
