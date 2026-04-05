'use client';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface LandingContextType {
  globalDecode: boolean;
  globalDecodeLabel: string;
  triggerGlobalDecode: (label: string) => void;
  buttonVisible: boolean;
  buttonPrompt: boolean;
  unlockButton: () => void;
}

const LandingContext = createContext<LandingContextType>({
  globalDecode: false,
  globalDecodeLabel: '',
  triggerGlobalDecode: () => {},
  buttonVisible: false,
  buttonPrompt: false,
  unlockButton: () => {},
});

export function LandingProvider({ children }: { children: ReactNode }) {
  const [globalDecode, setGlobalDecode] = useState(false);
  const [globalDecodeLabel, setGlobalDecodeLabel] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPrompt, setButtonPrompt] = useState(false);

  const triggerGlobalDecode = useCallback((label: string) => {
    setGlobalDecodeLabel(label);
    setGlobalDecode(true);
  }, []);

  const unlockButton = useCallback(() => {
    setButtonPrompt(false);
    setButtonVisible(true);
  }, []);

  useEffect(() => {
    if (buttonVisible) return;
    const timer = setTimeout(() => {
      setButtonVisible(true);
      setButtonPrompt(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [buttonVisible]);

  return (
    <LandingContext.Provider
      value={{
        globalDecode,
        globalDecodeLabel,
        triggerGlobalDecode,
        buttonVisible,
        buttonPrompt,
        unlockButton,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

export function useLanding() {
  return useContext(LandingContext);
}
