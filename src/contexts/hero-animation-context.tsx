"use client";

import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';
import type { ReactNode } from 'react';

interface HeroAnimationContextType {
  isSyncing: boolean;
  syncText: string;
  startSync: (text: string) => void;
}

const HeroAnimationContext = createContext<HeroAnimationContextType | null>(null);

export function HeroAnimationProvider({ children }: { children: ReactNode }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncText, setSyncText] = useState('');

  const startSync = useCallback((text: string) => {
    setSyncText(text);
    setIsSyncing(true);
  }, []);

  const value = useMemo(() => ({ isSyncing, syncText, startSync }), [isSyncing, syncText, startSync]);

  return (
    <HeroAnimationContext.Provider value={value}>
      {children}
    </HeroAnimationContext.Provider>
  );
}

export const useHeroAnimation = () => {
  const context = useContext(HeroAnimationContext);
  if (!context) {
    throw new Error('useHeroAnimation must be used within a HeroAnimationProvider');
  }
  return context;
};
