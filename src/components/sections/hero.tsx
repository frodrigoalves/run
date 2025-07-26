'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TypedEffect from '@/components/typed-effect';
import { useLocalization } from '@/hooks/use-localization';
import type { Language } from '@/components/localization-provider';
import { useTheme } from 'next-themes';
import { Moon, Sun, Ghost } from 'lucide-react';

export default function Hero() {
  const { lang, changeLang, t } = useLocalization();
  const { setTheme } = useTheme();

  const titles = {
    pt: ["Desenvolvedor Web3", "Especialista em IA", "Advogado & Criador do SingulAI"],
    en: ["Web3 Developer", "AI Specialist", "Lawyer & Creator of SingulAI"]
  };
  
  const intro = {
      pt: 'Sou Rodrigo, desenvolvedor Web3 com background jurídico e visão criativa. Este é o meu portfólio interativo, onde você pode explorar projetos reais, soluções com IA e blockchain, e experiências desenvolvidas com propósito e tecnologia.',
      en: 'I\'m Rodrigo, a Web3 developer with a legal background and a creative vision. This is my interactive portfolio, where you can explore real projects, solutions with AI and blockchain, and experiences developed with purpose and technology.'
  }

  const handleLangChange = (newLang: Language) => {
    changeLang(newLang);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  }

  return (
    <header className="py-16 text-center relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url(\'https://www.transparenttextures.com/patterns/cubes.png\')] opacity-5"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <Image
          src="https://placehold.co/128x128.png"
          alt="Foto de Rodrigo Alves Ferreira"
          width={128}
          height={128}
          data-ai-hint="profile photo"
          className="w-32 h-32 rounded-full mx-auto border-4 border-border shadow-xl mb-4 object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Rodrigo Alves Ferreira</h1>
        <div className="text-lg md:text-xl text-primary mt-2">
          <TypedEffect strings={titles[lang]} />
        </div>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(intro)}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button
            onClick={() => handleLangChange('pt')}
            variant={lang === 'pt' ? 'default' : 'secondary'}
            className="transition-transform hover:scale-105"
          >
            🇧🇷 Português
          </Button>
          <Button
            onClick={() => handleLangChange('en')}
            variant={lang === 'en' ? 'default' : 'secondary'}
            className="transition-transform hover:scale-105"
          >
            🇬🇧 English
          </Button>
        </div>
        
        <div className="group fixed top-5 right-5 z-50 flex flex-col items-center gap-1">
          <div className="relative flex flex-col items-center gap-2">
              <button onClick={() => handleThemeChange('light')} aria-label='Switch to light theme' className="group/button relative flex h-12 w-12 items-center justify-center rounded-full bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 ease-in-out hover:scale-110 group-hover:translate-x-0 -translate-x-20 opacity-0 group-hover:opacity-100">
                  <Sun className="h-[1.4rem] w-[1.4rem] text-foreground" />
              </button>
              <button onClick={() => handleThemeChange('dark')} aria-label='Switch to dark theme' className="group/button relative flex h-14 w-14 items-center justify-center rounded-full bg-card/50 backdrop-blur-md border border-border/50 transition-all duration-500 ease-in-out hover:scale-110 group-hover:translate-x-0 -translate-x-20 opacity-0 group-hover:opacity-100">
                  <Moon className="h-[1.5rem] w-[1.5rem] text-foreground" />
              </button>
              <button onClick={() => handleThemeChange('cyberpunk')} aria-label='Switch to cyberpunk theme' className="group/button relative flex h-12 w-12 items-center justify-center rounded-full bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-700 ease-in-out hover:scale-110 group-hover:translate-x-0 -translate-x-20 opacity-0 group-hover:opacity-100">
                  <Ghost className="h-[1.4rem] w-[1.4rem] text-foreground" />
              </button>
          </div>
        </div>

      </div>
    </header>
  );
}
