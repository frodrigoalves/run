"use client";

import { useContext } from 'react';
import { LocalizationContext } from '@/components/localization-provider';

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
