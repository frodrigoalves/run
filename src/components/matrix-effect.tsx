'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MatrixEffectProps {
  strings: string[];
  className?: string;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&^%$#@!';

const ScrambledChar = ({ char, isRevealed }: { char: string; isRevealed: boolean }) => {
  const [displayChar, setDisplayChar] = useState('');

  useEffect(() => {
    if (isRevealed) {
      setDisplayChar(char);
      return;
    }

    let revealTimeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      const randomChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      setDisplayChar(randomChar);
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(revealTimeout);
    };
  }, [isRevealed, char]);

  return (
    <span
      className={cn(
        'transition-opacity duration-500',
        isRevealed ? 'opacity-100' : 'opacity-20'
      )}
    >
      {displayChar}
    </span>
  );
};

export const MatrixEffect = ({ strings, className }: MatrixEffectProps) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  const currentString = useMemo(() => strings[stringIndex] || '', [strings, stringIndex]);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      if (revealedCount < currentString.length) {
        setRevealedCount((prev) => prev + 1);
      } else {
        // When done revealing, wait a bit then reset for the next string
        setTimeout(() => {
          setRevealedCount(0);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }, 2000); // Pause before switching to the next string
      }
    }, 75); // Speed of character reveal

    return () => clearTimeout(revealTimer);
  }, [revealedCount, currentString, strings.length]);


  return (
    <div className={cn("font-code text-center", className)}>
      <h2 className="text-lg tracking-wider">
        {currentString.split('').map((char, index) => (
          <ScrambledChar key={index} char={char} isRevealed={index < revealedCount} />
        ))}
      </h2>
    </div>
  );
};
