'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface MatrixEffectProps {
  strings: string[];
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const ScrambledChar = ({ char, isRevealed }: { char: string; isRevealed: boolean }) => {
  const [displayChar, setDisplayChar] = useState('');

  useEffect(() => {
    if (isRevealed) {
      setDisplayChar(char);
      return;
    }

    const interval = setInterval(() => {
      const randomChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      setDisplayChar(randomChar);
    }, 100);

    return () => clearInterval(interval);
  }, [isRevealed, char]);

  return (
    <span
      className={cn(
        'transition-opacity duration-300',
        isRevealed ? 'opacity-100' : 'opacity-60'
      )}
    >
      {displayChar}
    </span>
  );
};

export const MatrixEffect = ({ strings }: MatrixEffectProps) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const currentString = useMemo(() => strings[stringIndex] || '', [strings, stringIndex]);

  useEffect(() => {
    if (!isAnimating) return;

    const revealTimer = setTimeout(() => {
      if (revealedCount < currentString.length) {
        setRevealedCount((prev) => prev + 1);
      } else {
        // Pause at the end of the string
        setTimeout(() => {
          setIsAnimating(false);
          // Start hiding after a pause
          setTimeout(() => {
             setRevealedCount(0);
             setStringIndex((prev) => (prev + 1) % strings.length);
             setIsAnimating(true);
          }, 2000); // Pause before switching to the next string
        }, 1000); // Pause when fully revealed
      }
    }, 75); // Speed of character reveal

    return () => clearTimeout(revealTimer);
  }, [revealedCount, isAnimating, currentString.length, strings.length]);


  return (
    <div className="font-code text-center">
      <h2 className="text-2xl tracking-wider">
        {currentString.split('').map((char, index) => (
          <ScrambledChar key={index} char={char} isRevealed={index < revealedCount} />
        ))}
      </h2>
    </div>
  );
};
