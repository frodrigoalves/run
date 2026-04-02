'use client';
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface LandingContextType {
  globalDecode: boolean;
  globalDecodeLabel: string;
  triggerGlobalDecode: (label: string) => void;
}

const LandingContext = createContext<LandingContextType>({
  globalDecode: false,
  globalDecodeLabel: '',
  triggerGlobalDecode: () => {},
});

export function LandingProvider({ children }: { children: ReactNode }) {
  const [globalDecode, setGlobalDecode] = useState(false);
  const [globalDecodeLabel, setGlobalDecodeLabel] = useState('');

  const triggerGlobalDecode = useCallback((label: string) => {
    setGlobalDecodeLabel(label);
    setGlobalDecode(true);
  }, []);

  return (
    <LandingContext.Provider value={{ globalDecode, globalDecodeLabel, triggerGlobalDecode }}>
      {children}
    </LandingContext.Provider>
  );
}

export function useLanding() {
  return useContext(LandingContext);
}
