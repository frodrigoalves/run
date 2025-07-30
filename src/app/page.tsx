
'use client';
import { LocalizationProvider } from '@/components/localization-provider';
import { MatrixEffect } from '@/components/matrix-effect';
import Hero from '@/components/sections/hero';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeroAnimationProvider, useHeroAnimation } from '@/contexts/hero-animation-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TopBar from '@/components/top-bar';
import { ControlsHint } from '@/components/controls-hint';
import { useLocalization } from '@/hooks/use-localization';

const phrases = [
    { pt: "[█░░░░░░░░░] Decodificando...", en: "[█░░░░░░░░░] Decoding..." },
    { pt: "Web3 não é o futuro. É o agora.", en: "Web3 is not the future. It's the now." },
    { pt: "Inteligência Artificial + Automação = Escalabilidade", en: "Artificial Intelligence + Automation = Scalability" },
    { pt: "Breaking the code", en: "Breaking the code" },
    { pt: "Smart Contracts que criam confiança.", en: "Smart Contracts that build trust." },
    { pt: "Do Direito ao Blockchain: uma trajetória singular.", en: "From Law to Blockchain: a unique trajectory." },
    { pt: "Entering the Network", en: "Entering the Network" },
    { pt: "Cada linha de código carrega um propósito.", en: "Every line of code carries a purpose." },
    { pt: "Explorar é a única forma de evoluir.", en: "To explore is the only way to evolve." },
];


function LandingPageContent() {
  const { isSyncing, startSync } = useHeroAnimation();
  const router = useRouter();
  const { t, lang } = useLocalization();
  const [phraseIndex, setPhraseIndex] = useState(0);

  const buttonText = {
    pt: 'Acesso Autorizado',
    en: 'Access Authorized',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startSync('ACESSO AUTORIZADO');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000); // Change phrase every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSyncing) {
      setTimeout(() => {
        router.push('/home');
      }, 2000); // Wait for sync animation to complete
    }
  }, [isSyncing, router]);
  
  const currentPhrase = phrases[phraseIndex][lang] || phrases[phraseIndex]['en'];

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <div className='relative z-50 pt-4'>
        <TopBar showNav={false} />
        <ControlsHint />
      </div>

      <h1 className="sr-only">Rodrigo Alves | Desenvolvedor Web3 & Especialista em IA</h1>

      <Hero />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-8 w-full max-w-2xl text-center">

        <div className="text-center h-12 flex items-center justify-center">
            <MatrixEffect 
                key={phraseIndex}
                strings={[currentPhrase]}
                isFeatured={true}
                className="text-xl md:text-2xl font-sans"
                stopAfter={3500}
                loopAfter={4000}
            />
        </div>

        <div className="relative w-56 h-12">
            <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/70 hover:text-accent-foreground w-full h-full">
              <Link href="/home" onClick={handleClick} className="flex items-center gap-2">
                <MatrixEffect 
                  strings={[t(buttonText)]}
                  isFeatured={true}
                  className="text-base font-sans"
                  stopAfter={3800}
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
