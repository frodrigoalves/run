'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MatrixEffectProps {
  strings: string[];
  className?: string;
  isFeatured?: boolean;
  stopAfter?: number; // Time in ms to stop the animation permanently
  loopAfter?: number; // Time in ms to loop between animating and paused
  characterSet?: string[];
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

export const MatrixEffect = ({ strings, className, isFeatured = false, stopAfter, loopAfter, characterSet: customCharSet }: MatrixEffectProps) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const currentString = useMemo(() => strings[stringIndex] || '', [strings, stringIndex]);
  const characterSet = useMemo(() => customCharSet || DEFAULT_CHARACTERS.split(''), [customCharSet]);
  
  const animationIntervalRef = useRef<NodeJS.Timeout>();
  const loopIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Permanent stop logic
    if (stopAfter) {
      const stopTimer = setTimeout(() => {
        setIsAnimating(false);
        setRevealedCount(currentString.length);
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      }, stopAfter);
      return () => clearTimeout(stopTimer);
    }
  }, [stopAfter, currentString.length]);

  useEffect(() => {
    // Loop logic (animating/paused)
    if (loopAfter) {
        if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = setInterval(() => {
            setIsAnimating(prev => !prev);
        }, loopAfter);
        return () => clearInterval(loopIntervalRef.current);
    }
  }, [loopAfter]);


  useEffect(() => {
    if (isAnimating) {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = setInterval(() => {
            setRevealedCount(prev => {
                if (prev < currentString.length) {
                    return prev + 1;
                } else {
                    // When animation completes, reset for next cycle
                     setTimeout(() => {
                        setRevealedCount(0);
                        setStringIndex(prevIdx => (prevIdx + 1) % strings.length);
                     }, loopAfter ? 0 : 2000); // Reset immediately if looping
                    return currentString.length;
                }
            });
        }, 50);
    } else {
        // If not animating (paused state in a loop)
        setRevealedCount(currentString.length);
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    }

    return () => {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)
    };
  }, [isAnimating, currentString, strings, stringIndex, loopAfter]);

  useEffect(() => {
    setRevealedCount(0);
    setStringIndex(0);
    setIsAnimating(true); // Reset animation state on string change
  }, [strings]);


  return (
    <div className={cn("font-code", className)}>
      <div className="tracking-wider">
        {currentString.split('').map((char, index) => (
          <ScrambledChar key={index} char={char} isRevealed={index < revealedCount} isFeatured={isFeatured} characterSet={characterSet} />
        ))}
      </div>
    </div>
  );
};
