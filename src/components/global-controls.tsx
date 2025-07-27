'use client';

import { useLocalization } from '@/hooks/use-localization';
import type { Language } from '@/components/localization-provider';
import { useTheme } from 'next-themes';
import { Moon, Sun, Ghost } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'cyberpunk';

export default function GlobalControls() {
  const { lang, changeLang } = useLocalization();
  const { theme, setTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<Theme>('dark');
  
  useEffect(() => {
    if (theme) {
      setActiveTheme(theme as Theme);
    }
  }, [theme]);

  const handleLangChange = () => {
    const newLang = lang === 'pt' ? 'en' : 'pt';
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

    const baseClasses = "absolute flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-500 ease-in-out cursor-pointer";
    const size = 'w-6 h-6';

    // Adjusted transform values to keep all icons within the container
    if (position === 0) {
      return cn(baseClasses, size, "z-30 transform translate-x-5 scale-100 opacity-100");
    }
    if (position === 1) {
      return cn(baseClasses, size, "z-20 transform translate-x-10 scale-90 opacity-75");
    }
    return cn(baseClasses, size, "z-10 transform translate-x-0 scale-80 opacity-50");
  };

  const getLangClasses = (buttonLang: Language) => {
    const baseClasses = "absolute flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border/50 transition-all duration-500 ease-in-out cursor-pointer";
    const size = 'w-6 h-6 text-xs';
    
    if (buttonLang === lang) {
      // Active language
      return cn(baseClasses, size, "z-30 transform translate-x-0 scale-100 opacity-100");
    } else {
      // Inactive language
      return cn(baseClasses, size, "z-20 transform -translate-x-5 scale-90 opacity-75");
    }
  };


  return (
    <div className='flex items-center justify-end gap-10 pl-2'>
      <div className="relative h-6 w-6 flex items-center justify-start cursor-pointer" onClick={handleLangChange}>
          <div aria-label='Mudar para Português' className={cn(getLangClasses('pt'))}>
              <span>BR</span>
          </div>
          <div aria-label='Switch to English' className={cn(getLangClasses('en'))}>
              <span>US</span>
          </div>
      </div>
      
      <div className="relative h-6 w-16 flex items-center justify-start group cursor-pointer" onClick={handleThemeChange}>
          <div aria-label='Switch to light theme' className={cn(getThemeClasses('light'))}>
              <Sun className="h-3 w-3 text-foreground" />
          </div>
          <div aria-label='Switch to dark theme' className={cn(getThemeClasses('dark'))}>
              <Moon className="h-3 w-3 text-foreground" />
          </div>
          <div aria-label='Switch to cyberpunk theme' className={cn(getThemeClasses('cyberpunk'))}>
              <Ghost className="h-3 w-3 text-foreground" />
          </div>
      </div>
    </div>
  );
}
