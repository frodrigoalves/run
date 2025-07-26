'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MatrixEffectProps {
  strings: string[];
  className?: string;
  isFeatured?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&^%$#@!';

const ScrambledChar = ({ char, isRevealed, isFeatured }: { char: string; isRevealed: boolean; isFeatured: boolean }) => {
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
        'transition-opacity duration-500',
        isRevealed && isFeatured ? 'opacity-100' : 'opacity-20'
      )}
    >
      {displayChar}
    </span>
  );
};

export const MatrixEffect = ({ strings, className, isFeatured = false }: MatrixEffectProps) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  const currentString = useMemo(() => strings[stringIndex] || '', [strings, stringIndex]);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      if (revealedCount < currentString.length) {
        setRevealedCount((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setRevealedCount(0);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }, 2000); 
      }
    }, 75);

    return () => clearTimeout(revealTimer);
  }, [revealedCount, currentString, strings.length]);


  return (
    <div className={cn("font-code text-center", className)}>
      <h2 className="text-lg tracking-wider">
        {currentString.split('').map((char, index) => (
          <ScrambledChar key={index} char={char} isRevealed={index < revealedCount} isFeatured={isFeatured} />
        ))}
      </h2>
    </div>
  );
};
