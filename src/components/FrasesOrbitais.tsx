'use client';

import { useEffect, useMemo, useState } from 'react';
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

function PhraseNode({ phrases, prefersReduced, seedDelay }: PhraseNodeProps) {
  const [display, setDisplay] = useState('');
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>(() => randomPosition());

  useEffect(() => {
    if (!phrases.length) {
      setDisplay('');
      setVisible(false);
      return undefined;
    }

    let cancelled = false;
    let raf: number | undefined;
    let cycleTimeout: ReturnType<typeof setTimeout> | undefined;
    let holdTimeout: ReturnType<typeof setTimeout> | undefined;
    let currentIndex = Math.floor(Math.random() * phrases.length);

    const pickNextIndex = () => {
      if (phrases.length <= 1) return currentIndex;
      let next = Math.floor(Math.random() * phrases.length);
      while (next === currentIndex) {
        next = Math.floor(Math.random() * phrases.length);
      }
      currentIndex = next;
      return currentIndex;
    };

    const clearTimers = () => {
      if (cycleTimeout) clearTimeout(cycleTimeout);
      if (holdTimeout) clearTimeout(holdTimeout);
      if (raf) cancelAnimationFrame(raf);
    };

    const scheduleCycle = (delay: number) => {
      if (cycleTimeout) clearTimeout(cycleTimeout);
      cycleTimeout = setTimeout(() => {
        if (cancelled) return;
        const phrase = phrases[currentIndex] ?? '';
        setPosition(randomPosition());
        setVisible(true);

        if (prefersReduced) {
          setDisplay(phrase);
          if (holdTimeout) clearTimeout(holdTimeout);
          holdTimeout = setTimeout(() => {
            if (cancelled) return;
            setVisible(false);
            pickNextIndex();
            scheduleCycle(randomBetween(MIN_DELAY, MAX_DELAY));
          }, HOLD_DURATION);
          return;
        }

        const startTime = performance.now();
        const animate = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          if (elapsed < DECODE_DURATION) {
            const progress = Math.min(1, elapsed / DECODE_DURATION);
            const eased = 1 - Math.pow(1 - progress, 2);
            const revealed = Math.max(1, Math.floor(eased * phrase.length));
            const decoded = phrase.slice(0, revealed);
            const scrambled = scramble(Math.max(phrase.length - revealed, 0));
            setDisplay(decoded + scrambled);
            raf = requestAnimationFrame(animate);
          } else {
            setDisplay(phrase);
            if (holdTimeout) clearTimeout(holdTimeout);
            holdTimeout = setTimeout(() => {
              if (cancelled) return;
              setVisible(false);
              pickNextIndex();
              scheduleCycle(randomBetween(MIN_DELAY, MAX_DELAY));
            }, HOLD_DURATION);
          }
        };

        setDisplay(scramble(Math.max(phrase.length, 6)));
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      }, delay);
    };

    scheduleCycle(seedDelay);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [phrases, prefersReduced, seedDelay]);

  return (
    <span
      className={`pointer-events-none absolute font-mono text-[0.65rem] uppercase tracking-[0.35em] text-foreground/45 transition-opacity duration-700 ease-out md:text-[0.7rem] lg:text-sm ${
        visible ? 'opacity-80' : 'opacity-0'
      }`}
      style={{ top: position.top, left: position.left }}
    >
      {display}
    </span>
  );
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
