'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TypedEffect from '@/components/typed-effect';
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
    setTheme(newTheme);
    setActiveTheme(newTheme);
  }
  
  const themeOrder: Theme[] = ['light', 'dark', 'cyberpunk'];
  const activeIndex = themeOrder.indexOf(activeTheme);

  const getThemeClasses = (buttonTheme: Theme) => {
    const baseClasses = "flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-500 ease-in-out absolute";
    
    let displayIndex = (themeOrder.indexOf(buttonTheme) - activeIndex + 3) % 3;

    if (displayIndex === 0) {
        // Current theme: front and largest
        return cn(baseClasses, "w-10 h-10 z-30 transform scale-100 opacity-100 translate-y-0");
    } else if (displayIndex === 1) {
        // Next theme
        return cn(baseClasses, "w-9 h-9 z-20 transform scale-90 opacity-75 translate-y-12");
    } else {
        // Previous theme
        return cn(baseClasses, "w-8 h-8 z-10 transform scale-80 opacity-50 translate-y-24");
    }
  };


  return (
    <header className="py-16 text-center relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <Image
          src="https://placehold.co/128x128.png"
          alt="Foto de Rodrigo Alves Ferreira"
          width={128}
          height={128}
          data-ai-hint="profile photo"
          className="w-32 h-32 rounded-full mx-auto border-4 border-border shadow-xl mb-4 object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Rodrigo</h1>
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
        
        <div className="fixed top-24 right-8 z-50 h-28 w-12 flex items-center justify-center">
            <button onClick={() => handleThemeChange('light')} aria-label='Switch to light theme' className={cn(getThemeClasses('light'), 'w-6 h-6')}>
                <Sun className="h-[1.0rem] w-[1.0rem] text-foreground" />
            </button>
            <button onClick={() => handleThemeChange('dark')} aria-label='Switch to dark theme' className={cn(getThemeClasses('dark'), 'w-6 h-6')}>
                <Moon className="h-[1.0rem] w-[1.0rem] text-foreground" />
            </button>
            <button onClick={() => handleThemeChange('cyberpunk')} aria-label='Switch to cyberpunk theme' className={cn(getThemeClasses('cyberpunk'), 'w-6 h-6')}>
                <Ghost className="h-[1.0rem] w-[1.0rem] text-foreground" />
            </button>
        </div>

      </div>
    </header>
  );
}
