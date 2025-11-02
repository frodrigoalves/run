
"use client";

import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LocalizationContextType {
  lang: Language;
  changeLang: (lang: Language) => void;
  t: (translations: Record<Language, string>) => string;
}

export const LocalizationContext = createContext<LocalizationContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
  initialLang?: Language;
}

export function LocalizationProvider({ children, initialLang }: ProviderProps) {
  const [lang, setLang] = useState<Language>(initialLang ?? 'pt');

  const changeLang = useCallback((newLang: Language) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
        localStorage.setItem('lang', newLang);
    }
  }, []);

  const t = useCallback((translations: Record<Language, string>): string => {
    return translations[lang] || translations['en'];
  }, [lang]);

  useEffect(() => {
    if (initialLang) {
      setLang(initialLang);
      return;
    }

    const savedLang = localStorage.getItem('lang') as Language | null;
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, [initialLang]);

  const value = useMemo(() => ({ lang, changeLang, t }), [lang, changeLang, t]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}
