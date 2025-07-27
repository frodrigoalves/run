'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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
  const currentString = useMemo(() => activeStrings[stringIndex] || '', [activeStrings, stringIndex]);
  const characterSet = useMemo(() => customCharSet || DEFAULT_CHARACTERS.split(''), [customCharSet]);
  
  const animationIntervalRef = useRef<NodeJS.Timeout>();
  const loopIntervalRef = useRef<NodeJS.Timeout>();
  
  // Effect to handle synchronization state change
  useEffect(() => {
    if (isSyncing) {
        setRevealedCount(0);
        setIsFullyRevealed(false);
        setStringIndex(0);
        setIsAnimating(true);
        if(loopIntervalRef.current) clearInterval(loopIntervalRef.current);
        if(animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    }
  }, [isSyncing]);


  useEffect(() => {
    // Permanent stop logic
    if (stopAfter && !isSyncing) {
      const stopTimer = setTimeout(() => {
        setIsAnimating(false);
        setRevealedCount(currentString.length);
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      }, stopAfter);
      return () => clearTimeout(stopTimer);
    }
  }, [stopAfter, currentString.length, isSyncing]);

  useEffect(() => {
    // Loop logic (animating/paused)
    if (loopAfter && !isSyncing) {
        if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = setInterval(() => {
            setIsAnimating(prev => !prev);
        }, loopAfter);
        return () => clearInterval(loopIntervalRef.current);
    }
  }, [loopAfter, isSyncing]);


  useEffect(() => {
    if (isAnimating) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = setInterval(() => {
            setRevealedCount(prev => {
                if (prev < currentString.length) {
                    setIsFullyRevealed(false);
                    return prev + 1;
                } else {
                    setIsFullyRevealed(true);
                    if (!isSyncing) { // Only loop if not in sync mode
                         setTimeout(() => {
                            setRevealedCount(0);
                            setIsFullyRevealed(false);
                            setStringIndex(prevIdx => (prevIdx + 1) % activeStrings.length);
                         }, loopAfter ? 0 : 2000);
                    }
                    return currentString.length;
                }
            });
        }, 50);
    } else {
        setRevealedCount(currentString.length);
        setIsFullyRevealed(true);
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    }

    return () => {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)
    };
  }, [isAnimating, currentString, activeStrings, stringIndex, loopAfter, isSyncing]);

  // This effect resets the animation when the source strings change.
  useEffect(() => {
    setRevealedCount(0);
    setIsFullyRevealed(false);
    setStringIndex(0);
    setIsAnimating(true);
  }, [strings]);


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
