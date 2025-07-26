"use client";

import React, { createContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LocalizationContextType {
  lang: Language;
  changeLang: (lang: Language) => void;
  t: (translations: Record<Language, string>) => string;
}

export const LocalizationContext = createContext<LocalizationContextType | null>(null);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('pt');

  const changeLang = useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  const t = useCallback((translations: Record<Language, string>): string => {
    return translations[lang] || translations['pt'];
  }, [lang]);

  const value = useMemo(() => ({ lang, changeLang, t }), [lang, changeLang, t]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}
