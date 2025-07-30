
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

  const [namePosition, setNamePosition] = useState({ top: '30%', left: '50%' });
  const [arrowStyle, setArrowStyle] = useState({ transform: 'rotate(90deg)' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const arrowCharacters = useMemo(() => ['↓', '→', '↘', '↙', '←', '↖', '↗', '↓'], []);

  useEffect(() => {
    if (!isClient) return;

    const updatePositions = () => {
      // Center of the screen from which the arrow originates
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Random angle and radius to position the name
      const angle = Math.random() * 2 * Math.PI;
      const radiusX = window.innerWidth * 0.35; 
      const radiusY = window.innerHeight * 0.35;
      
      const targetX = centerX + Math.cos(angle) * radiusX;
      const targetY = centerY + Math.sin(angle) * radiusY;

      setNamePosition({
        top: `${targetY}px`,
        left: `${targetX}px`,
      });
      
      // Calculate angle from center to target for the arrow's rotation
      const deltaX = targetX - centerX;
      const deltaY = targetY - centerY;
      const arrowAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      setArrowStyle({
        transform: `rotate(${arrowAngle}deg)`
      });
    };

    updatePositions(); 
    const interval = setInterval(updatePositions, 4000);

    return () => clearInterval(interval);
  }, [isClient]);

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
           style={{...namePosition}}
        >
           <MatrixEffect
            strings={["Rodrigo Alves"]}
            isFeatured={true}
            stopAfter={3800}
            loopAfter={4000}
          />
        </div>
        
        <div className='relative w-full h-10 flex items-center justify-center'>
             <div className="absolute transition-transform duration-1000 ease-in-out" style={arrowStyle}>
                <MatrixEffect 
                  strings={arrowCharacters}
                  isFeatured={true}
                  className="text-2xl font-sans"
                  stopAfter={3800}
                  loopAfter={4000}
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
                  stopAfter={2000}
                  loopAfter={5000}
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
