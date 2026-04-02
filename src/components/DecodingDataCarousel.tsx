'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import DecodingItem from './DecodingItem';
import { decodingItems } from '@/lib/data';

const MAX_ACTIVE = 6;

/* ── Positions distributed around edges, avoiding center button area ── */
const POSITIONS = [
  { top: '6%', left: '4%' },
  { top: '8%', left: '68%' },
  { top: '16%', left: '22%' },
  { top: '14%', left: '82%' },
  { top: '28%', left: '5%' },
  { top: '32%', left: '74%' },
  { top: '42%', left: '2%' },
  { top: '44%', left: '80%' },
  { top: '58%', left: '4%' },
  { top: '56%', left: '76%' },
  { top: '70%', left: '10%' },
  { top: '68%', left: '82%' },
  { top: '80%', left: '6%' },
  { top: '82%', left: '68%' },
  { top: '90%', left: '22%' },
  { top: '88%', left: '56%' },
];

/* Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface ActiveItem {
  id: number;
  label: string;
  isPerson: boolean;
  posIdx: number;
}

let uid = 0;

export default function DecodingDataCarousel() {
  const [active, setActive] = useState<ActiveItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const queueRef = useRef<typeof decodingItems>([]);
  const queueIdxRef = useRef(0);
  const posIdxRef = useRef(0);

  const nextItem = useCallback(() => {
    if (queueIdxRef.current >= queueRef.current.length) {
      queueRef.current = shuffle(decodingItems);
      queueIdxRef.current = 0;
    }
    return queueRef.current[queueIdxRef.current++];
  }, []);

  const nextPos = useCallback(() => {
    const idx = posIdxRef.current % POSITIONS.length;
    posIdxRef.current++;
    return idx;
  }, []);

  const spawnItem = useCallback(() => {
    const data = nextItem();
    const posIdx = nextPos();
    const item: ActiveItem = {
      id: uid++,
      label: data.label,
      isPerson: data.isPerson,
      posIdx,
    };
    setActive((prev) => [...prev, item]);
  }, [nextItem, nextPos]);

  const handleDone = useCallback(
    (id: number) => {
      setActive((prev) => prev.filter((i) => i.id !== id));
      spawnItem();
    },
    [spawnItem],
  );

  /* Mount guard — defer to client */
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) setIsMounted(true);
  }, []);

  /* Spawn items after mount (Strict Mode safe — cleanup resets state) */
  useEffect(() => {
    if (!isMounted) return;

    queueRef.current = shuffle(decodingItems);
    queueIdxRef.current = 0;
    posIdxRef.current = 0;

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < MAX_ACTIVE; i++) {
      timers.push(setTimeout(() => spawnItem(), i * 700));
    }

    return () => {
      timers.forEach(clearTimeout);
      setActive([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-[1]"
    >
      {active.map((item) => (
        <DecodingItem
          key={item.id}
          label={item.label}
          isPerson={item.isPerson}
          top={POSITIONS[item.posIdx].top}
          left={POSITIONS[item.posIdx].left}
          onDone={() => handleDone(item.id)}
        />
      ))}
    </div>
  );
}
