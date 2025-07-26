"use client";

import { useContext } from 'react';
import { LocalizationContext } from '@/components/localization-provider';
import type { Language } from '@/components/localization-provider';

interface LocalizationContextType {
  lang: Language;
  changeLang: (lang: Language) => void;
  t: (translations: Record<Language, string>) => string;
}


export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
