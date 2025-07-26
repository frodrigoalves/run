'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MatrixEffect } from '@/components/matrix-effect';
import { useLocalization } from '@/hooks/use-localization';
import type { Language } from '@/components/localization-provider';
import { useTheme } from 'next-themes';
import { Moon, Sun, Ghost } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'cyberpunk';

export default function Hero() {
  const { lang, changeLang, t } = useLocalization();
  const { theme, setTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.body.dataset.theme = theme;
    if (theme) {
      setActiveTheme(theme as Theme);
    }
  }, [theme]);
  
  const titles = {
    pt: ["Desenvolvedor Web3", "Especialista em IA", "Advogado & Criador do SingulAI"],
    en: ["Web3 Developer", "AI Specialist", "Lawyer & Creator of SingulAI"]
  };
  
  const intro = {
      pt: 'Este é o meu portfólio interativo, onde você pode explorar projetos reais, soluções com IA e blockchain, e experiências desenvolvidas com propósito e tecnologia.',
      en: 'This is my interactive portfolio, where you can explore real projects, AI and blockchain solutions, and experiences developed with purpose and technology.'
  }

  const handleLangChange = (newLang: Language) => {
    changeLang(newLang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    const themeOrder: Theme[] = ['light', 'dark', 'cyberpunk'];
    const currentIndex = themeOrder.indexOf(activeTheme);
    const newIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[newIndex]);
  }
  
  const getThemeClasses = (buttonTheme: Theme) => {
    const themeOrder: Theme[] = ['light', 'dark', 'cyberpunk'];
    const activeIndex = themeOrder.indexOf(activeTheme);
    const buttonIndex = themeOrder.indexOf(buttonTheme);

    let position = (buttonIndex - activeIndex + 3) % 3;

    const baseClasses = "absolute flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-500 ease-in-out";

    // Posição 0: Ativo (na frente)
    if (position === 0) {
        return cn(baseClasses, "w-6 h-6 z-30 transform scale-100 opacity-100 translate-y-0");
    }
    // Posição 1: Próximo (atrás)
    else if (position === 1) {
        return cn(baseClasses, "w-6 h-6 z-20 transform scale-90 opacity-75 translate-y-5");
    }
    // Posição 2: Último (mais atrás)
    else {
        return cn(baseClasses, "w-6 h-6 z-10 transform scale-80 opacity-50 translate-y-10");
    }
  };


  return (
    <header className="py-24 md:py-32 text-center relative overflow-hidden border-b border-border min-h-[500px] md:min-h-[450px]">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {/* Matrix Effects */}
      <div className="absolute top-10 left-8 opacity-0 animate-fade-in-delay-1">
        <MatrixEffect strings={["system.init()"]} />
      </div>
      <div className="absolute top-24 right-12 opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect strings={["load: /blockchain/modules", "booting: SingulAI"]} />
      </div>
       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delay-3">
        <MatrixEffect strings={["render: portfolio.interactive"]}/>
      </div>
       <div className="absolute bottom-24 right-8 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect strings={["ACCESS GRANTED"]}/>
      </div>


      <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">
        <Image
          src="https://placehold.co/128x128.png"
          alt="Foto de Rodrigo Alves Ferreira"
          width={128}
          height={128}
          data-ai-hint="profile photo"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto border-4 border-border shadow-xl mb-4 object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Rodrigo</h1>
        <div className="text-lg md:text-xl text-primary mt-2 min-h-[56px] flex items-center justify-center">
          <MatrixEffect strings={titles[lang]} />
        </div>
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t(intro)}
        </p>
        <div className="mt-8 flex justify-center gap-2">
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
        
        <div className="fixed top-24 right-5 md:right-8 z-50 h-16 w-10 flex flex-col items-center justify-center group" onClick={() => handleThemeChange(activeTheme)}>
            <button aria-label='Switch to light theme' className={cn(getThemeClasses('light'))}>
                <Sun className="h-4 w-4 text-foreground" />
            </button>
            <button aria-label='Switch to dark theme' className={cn(getThemeClasses('dark'))}>
                <Moon className="h-4 w-4 text-foreground" />
            </button>
            <button aria-label='Switch to cyberpunk theme' className={cn(getThemeClasses('cyberpunk'))}>
                <Ghost className="h-4 w-4 text-foreground" />
            </button>
        </div>

      </div>
    </header>
  );
}

    