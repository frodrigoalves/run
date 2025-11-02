'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

type Position = { top: string; left: string };

const CHARSET = '█░▒▓<>/\\|*#=+~-';
const DECODE_DURATION = 3000;
const HOLD_DURATION = 3000;
const SLOT_COUNT = 4;
const MIN_DELAY = 900;
const MAX_DELAY = 1800;

function scramble(length: number) {
  if (length <= 0) return '';
  let out = '';
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * CHARSET.length);
    out += CHARSET[idx] ?? '';
  }
  return out;
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPosition() {
  let attempts = 0;
  while (attempts < 8) {
    const top = Math.random() * 80 + 10; // 10% - 90%
    const left = Math.random() * 80 + 10;
    const nearCenter = top > 38 && top < 62 && left > 32 && left < 68;
    if (!nearCenter) {
      return {
        top: `${top.toFixed(2)}%`,
        left: `${left.toFixed(2)}%`,
      } satisfies Position;
    }
    attempts += 1;
  }
  return {
    top: `${Math.random() * 10 + 5}%`,
    left: `${Math.random() * 60 + 20}%`,
  } satisfies Position;
}

type PhraseNodeProps = {
  phrases: string[];
  prefersReduced: boolean;
  seedDelay: number;
};

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
  const [seeds] = useState(() =>
    Array.from({ length: SLOT_COUNT }, (_, index) => index * 700 + Math.floor(Math.random() * 600)),
  );

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

  if (!phrases.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      {seeds.map((seed, index) => (
        <PhraseNode
          key={`phrase-node-${index}`}
          phrases={phrases}
          prefersReduced={prefersReduced}
          seedDelay={seed}
        />
      ))}
    </div>
  );
}
