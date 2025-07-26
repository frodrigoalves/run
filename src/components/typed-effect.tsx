'use client';

import { useState, useEffect } from 'react';

interface TypedEffectProps {
  strings: string[];
}

const TypedEffect = ({ strings }: TypedEffectProps) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const handleTyping = () => {
      const currentString = strings[stringIndex];
      const updatedText = isDeleting
        ? currentString.substring(0, text.length - 1)
        : currentString.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentString) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
      }
    };

    const typingSpeed = isDeleting ? 75 : 150;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, stringIndex, strings]);

  return (
    <span className="min-h-[32px]">{text}</span>
  );
};

export default TypedEffect;
