'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

type Position = { top: string; left: string };

const CHARSET = '<>/\\|*#=+~';
const DECODE_DURATION_RANGE: [number, number] = [1100, 1800];
const HOLD_DURATION_RANGE: [number, number] = [1800, 2600];
const SLOT_COUNT = 6;
const MIN_DELAY = 800;
const MAX_DELAY = 2200;

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

function randomDuration([min, max]: [number, number]) {
  return Math.random() * (max - min) + min;
}

function randomPosition() {
  let attempts = 0;
  while (attempts < 8) {
    const top = Math.random() * 60 + 20; // 20% - 80%
    const left = Math.random() * 60 + 20;
    const nearCenter = top > 34 && top < 66 && left > 30 && left < 70;
    if (!nearCenter) {
      return {
        top: `${top.toFixed(2)}%`,
        left: `${left.toFixed(2)}%`,
      } satisfies Position;
    }
    attempts += 1;
  }
  return {
    top: `${Math.random() * 14 + 6}%`,
    left: `${Math.random() * 50 + 25}%`,
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
  const [tilt] = useState(() => (Math.random() - 0.5) * 10);

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
        const decodeDuration = randomDuration(DECODE_DURATION_RANGE);
        const holdDuration = randomDuration(HOLD_DURATION_RANGE);
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
          }, holdDuration);
          return;
        }

        const startTime = performance.now();
        const animate = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startTime;
          if (elapsed < decodeDuration) {
            const progress = Math.min(1, elapsed / decodeDuration);
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
            }, holdDuration);
          }
        };

        const scrambleLength = Math.max(Math.ceil(phrase.length * 0.6), 4);
        setDisplay(scramble(scrambleLength));
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
      className={`pointer-events-none absolute font-mono text-[0.55rem] uppercase tracking-[0.3em] text-foreground/40 transition-opacity duration-700 ease-out md:text-[0.65rem] lg:text-[0.75rem] ${
        visible ? 'opacity-80' : 'opacity-0'
      }`}
      style={{ top: position.top, left: position.left, transform: `translate(-50%, -50%) rotate(${tilt}deg)` }}
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
