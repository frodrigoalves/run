
'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useHeroAnimation } from '@/contexts/hero-animation-context';

interface MatrixEffectProps {
  strings: string[];
  className?: string;
  isFeatured?: boolean;
  stopAfter?: number;
  loopAfter?: number;
  characterSet?: string[];
  showOnlyWhenComplete?: boolean;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&^%$#@!';

const ScrambledChar = ({ char, isRevealed, isFeatured, characterSet }: { char: string; isRevealed: boolean; isFeatured: boolean, characterSet: string[] }) => {
  const [displayChar, setDisplayChar] = useState('');

  useEffect(() => {
    if (isRevealed) {
      setDisplayChar(char);
      return;
    }

    const interval = setInterval(() => {
      const randomChar = characterSet[Math.floor(Math.random() * characterSet.length)];
      setDisplayChar(randomChar);
    }, 100);

    return () => clearInterval(interval);
  }, [isRevealed, char, characterSet]);

  return (
    <span
      className={cn(
        'transition-opacity duration-500',
        isRevealed && isFeatured ? 'opacity-100' : 'opacity-40'
      )}
    >
      {displayChar}
    </span>
  );
};

export const MatrixEffect = ({ strings, className, isFeatured = false, stopAfter, loopAfter, characterSet: customCharSet, showOnlyWhenComplete = false }: MatrixEffectProps) => {
  const { isSyncing, syncText } = useHeroAnimation();
  const [stringIndex, setStringIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  const activeStrings = useMemo(() => (isSyncing ? [syncText] : strings), [isSyncing, syncText, strings]);
  const currentString = useMemo(() => (activeStrings && activeStrings.length > 0) ? activeStrings[stringIndex] || '' : '', [activeStrings, stringIndex]);
  const characterSet = useMemo(() => customCharSet || DEFAULT_CHARACTERS.split(''), [customCharSet]);
  
  const animationIntervalRef = useRef<NodeJS.Timeout>();
  const loopTimeoutRef = useRef<NodeJS.Timeout>();
  const stopTimeoutRef = useRef<NodeJS.Timeout>();
  
  const resetAnimation = useCallback(() => {
    setStringIndex(0);
    setRevealedCount(0);
    setIsFullyRevealed(false);
    setIsAnimating(true);
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
  }, []);

  const startLoop = useCallback(() => {
    if (loopAfter && !isSyncing) {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = setTimeout(() => {
        resetAnimation();
      }, loopAfter);
    }
  }, [loopAfter, isSyncing, resetAnimation]);
  
  useEffect(() => {
    resetAnimation();
  }, [strings, isSyncing, resetAnimation]);

  useEffect(() => {
    if (!currentString) return;

    if (isAnimating) {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = setInterval(() => {
        setRevealedCount(prev => prev + 1);
      }, 50);
    } else {
      setRevealedCount(currentString.length);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    }

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    };
  }, [isAnimating, currentString]);

  useEffect(() => {
    if (revealedCount >= currentString.length) {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      setIsFullyRevealed(true);
      startLoop();
    }
  }, [revealedCount, currentString.length, startLoop]);
  
  useEffect(() => {
    if (stopAfter && !isSyncing) {
        if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
        }, stopAfter);
    }
    return () => {
        if(stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    }
  }, [stopAfter, isSyncing, strings]);


  return (
    <div className={cn(
        "font-code", 
        className,
        showOnlyWhenComplete && 'transition-opacity duration-300',
        showOnlyWhenComplete && !isFullyRevealed ? 'opacity-0' : 'opacity-100'
    )}>
      <div className="tracking-wider">
        {currentString.split('').map((char, index) => (
          <ScrambledChar key={index} char={char} isRevealed={index < revealedCount} isFeatured={isFeatured} characterSet={characterSet} />
        ))}
      </div>
    </div>
  );
};
