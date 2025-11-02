'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const CHARSET = '█░▒▓<>/\\|*#=+~-';
const DECODE_DURATION = 3000;
const HOLD_DURATION = 3000;

function scramble(length: number) {
  if (length <= 0) return '';
  let out = '';
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * CHARSET.length);
    out += CHARSET[idx] ?? '';
  }
  return out;
}

export default function FrasesOrbitais() {
  const t = useTranslations('landing');
  const phrases = useMemo(() => (t.raw('phrases') as string[]) ?? [], [t]);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setPrefersReduced(true);
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (event: Pick<MediaQueryList, 'matches'>) => {
      setPrefersReduced(event.matches);
    };

    update(media);

    const listener = (event: MediaQueryListEvent) => update(event);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }

    media.addListener(listener);
    return () => media.removeListener(listener);
  }, []);

  const [index, setIndex] = useState(() => (phrases.length ? Math.floor(Math.random() * phrases.length) : 0));
  const [display, setDisplay] = useState('');
  const rafRef = useRef<number>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!phrases.length) {
      setDisplay('');
      return;
    }

    setIndex((current) => {
      if (current < phrases.length) return current;
      return Math.min(current, phrases.length - 1);
    });
  }, [phrases]);

  useEffect(() => {
    if (!phrases.length) return;

    if (prefersReduced) {
      setDisplay(phrases[index] ?? '');
      const nextTimeout = setTimeout(() => {
        if (phrases.length <= 1) return;
        let nextIndex = Math.floor(Math.random() * phrases.length);
        while (nextIndex === index && phrases.length > 1) {
          nextIndex = Math.floor(Math.random() * phrases.length);
        }
        setIndex(nextIndex);
      }, HOLD_DURATION);
      timeoutRef.current = nextTimeout;
      return () => clearTimeout(nextTimeout);
    }

    const phrase = phrases[index] ?? '';
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < DECODE_DURATION) {
        const progress = Math.min(1, elapsed / DECODE_DURATION);
        const revealed = Math.floor(progress * phrase.length);
        const decoded = phrase.slice(0, revealed) + scramble(phrase.length - revealed);
        setDisplay(decoded);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(phrase);
        timeoutRef.current = setTimeout(() => {
          if (phrases.length <= 1) return;
          let nextIndex = Math.floor(Math.random() * phrases.length);
          if (phrases.length > 1) {
            while (nextIndex === index) {
              nextIndex = Math.floor(Math.random() * phrases.length);
            }
          }
          setIndex(nextIndex);
        }, HOLD_DURATION);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, phrases, prefersReduced]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
      <span className="font-mono text-sm tracking-[0.35em] text-foreground/70 md:text-base lg:text-lg">
        {display}
      </span>
    </div>
  );
}
