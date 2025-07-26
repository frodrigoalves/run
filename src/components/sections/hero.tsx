'use client';

import { Button } from '@/components/ui/button';
import { MatrixEffect } from '@/components/matrix-effect';
import { useLocalization } from '@/hooks/use-localization';
import type { Language } from '@/components/localization-provider';
import { useTheme } from 'next-themes';
import { Moon, Sun, Ghost } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'cyberpunk';

const allMatrixStrings = [
  ["system.init()", "usr/bin/security"],
  ["load: /blockchain/modules", "booting: SingulAI"],
  ["ACCESS GRANTED", "render:portfolio.interactive"],
  ["0x5a2e...c8a4", "eth_send"],
];

export default function Hero() {
  const { lang, changeLang, t } = useLocalization();
  const { theme, setTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<Theme>('dark');
  
  const [activeMatrixIndex, setActiveMatrixIndex] = useState(0);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);

  const titles = {
    pt: ["Desenvolvedor Web3", "Especialista em IA", "Advogado & Criador do SingulAI"],
    en: ["Web3 Developer", "AI Specialist", "Lawyer & Creator of SingulAI"]
  };
  
  useEffect(() => {
    document.body.dataset.theme = theme;
    if (theme) {
      setActiveTheme(theme as Theme);
    }
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextMatrixIndex = Math.floor(Math.random() * allMatrixStrings.length);
      setActiveMatrixIndex(nextMatrixIndex);
      setActiveSubtitleIndex(prev => (prev + 1) % titles[lang].length);
    }, 1500); 

    return () => clearInterval(interval);
  }, [lang, titles]);


  const handleLangChange = (newLang: Language) => {
    changeLang(newLang);
  };

  const handleThemeChange = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'cyberpunk'];
    const currentIndex = themeOrder.indexOf(activeTheme);
    const newIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[newIndex]);
  };
  
  const getThemeClasses = (buttonTheme: Theme) => {
    const themeOrder: Theme[] = ['light', 'dark', 'cyberpunk'];
    const activeIndex = themeOrder.indexOf(activeTheme);
    const buttonIndex = themeOrder.indexOf(buttonTheme);

    let position = (buttonIndex - activeIndex + 3) % 3;

    const baseClasses = "absolute flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-500 ease-in-out";
    const size = 'w-6 h-6';

    if (position === 0) {
      return cn(baseClasses, size, "z-30 transform -translate-y-0 scale-100 opacity-100");
    }
    if (position === 1) {
      return cn(baseClasses, size, "z-20 transform translate-y-3 scale-90 opacity-75");
    }
    return cn(baseClasses, size, "z-10 transform translate-y-6 scale-80 opacity-50");
  };

  return (
    <header className="py-24 md:py-32 text-center relative overflow-hidden border-b border-border min-h-[500px] md:min-h-[450px]">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {/* Matrix Effects */}
       <div className="absolute top-10 left-8 opacity-0 animate-fade-in-delay-1">
        <MatrixEffect 
          strings={allMatrixStrings[0]} 
          isFeatured={activeMatrixIndex === 0}
        />
      </div>
       <div className="absolute top-1/3 right-12 opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[1]}
          isFeatured={activeMatrixIndex === 1}
        />
      </div>
       <div className="absolute bottom-24 right-1/4 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[3]}
          isFeatured={activeMatrixIndex === 3}
        />
      </div>
       <div className="absolute top-3/4 left-12 opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[2]}
          isFeatured={activeMatrixIndex === 2}
        />
      </div>
       <div className="absolute top-1/2 left-1/4 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[1]}
          isFeatured={activeMatrixIndex === 4}
        />
      </div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delay-3 w-64 text-primary">
         <MatrixEffect 
          strings={[titles[lang][activeSubtitleIndex]]}
          isFeatured={true}
        />
      </div>


      <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">
        
        <div className="fixed top-5 left-5 md:left-8 z-50 flex items-center space-x-2">
            <div 
                onClick={() => handleLangChange('pt')} 
                aria-label='Mudar para Português' 
                className={cn(
                    "flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-opacity duration-300 w-6 h-6 cursor-pointer",
                    lang === 'pt' ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                )}
            >
                <span>🇧🇷</span>
            </div>
            <div 
                onClick={() => handleLangChange('en')} 
                aria-label='Switch to English' 
                className={cn(
                    "flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-opacity duration-300 w-6 h-6 cursor-pointer",
                    lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                )}
            >
                <span>🇬🇧</span>
            </div>
        </div>

        
        <div className="fixed top-5 right-5 md:right-8 z-50 h-8 w-6 flex flex-col items-center justify-start group pt-2" onClick={handleThemeChange}>
            <button aria-label='Switch to light theme' className={cn(getThemeClasses('light'))}>
                <Sun className="h-3 w-3 text-foreground" />
            </button>
            <button aria-label='Switch to dark theme' className={cn(getThemeClasses('dark'))}>
                <Moon className="h-3 w-3 text-foreground" />
            </button>
            <button aria-label='Switch to cyberpunk theme' className={cn(getThemeClasses('cyberpunk'))}>
                <Ghost className="h-3 w-3 text-foreground" />
            </button>
        </div>

      </div>
    </header>
  );
}
