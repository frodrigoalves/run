'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const MAX_ACTIVE = 6;
const MARGIN_PCT = 10; // 10–90% safe area

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

type Item = {
  id: string; text: string;
  topPct: number; leftPct: number; rot: number;
  state: 'enter'|'stay'|'exit';
};

export default function FrasesOrbitais() {
  const t = useTranslations('landing');
  const phrases = t.raw('phrases') as string[];
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [items, setItems] = useState<Item[]>([]);
  const idxRef = useRef(0);

  // ciclo de injeção
  useEffect(() => {
    if (!phrases?.length) return;
    if (prefersReduced) {
      setItems(phrases.slice(0, MAX_ACTIVE).map((text, i) => ({
        id: `static-${i}`,
        text, topPct: 15 + i*12, leftPct: 18 + (i%3)*22, rot: 0, state:'stay'
      })));
      return;
    }
    const iv = setInterval(() => {
      setItems(prev => {
        const next: Item[] = [...prev];
        // remover excedentes (com transição)
        if (next.length >= MAX_ACTIVE) {
          next[0] = { ...next[0], state:'exit' };
          setTimeout(() => setItems(s => s.slice(1)), 260);
        }
        const text = phrases[idxRef.current % phrases.length];
        idxRef.current++;
        // tentar posição com distância mínima
        let tries = 0; let top = 50, left = 50; let ok = false;
        while (tries < 3 && !ok) {
          top = rand(MARGIN_PCT, 100 - MARGIN_PCT);
          left = rand(MARGIN_PCT, 100 - MARGIN_PCT);
          ok = next.every(it => Math.hypot(it.topPct - top, it.leftPct - left) > 12);
          tries++;
        }
        next.push({ id: crypto.randomUUID(), text, topPct: top, leftPct: left, rot: rand(-8, 8), state:'enter' });
        return next;
      });
    }, 2700);
    return () => clearInterval(iv);
  }, [phrases, prefersReduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ id, text, topPct, leftPct, rot, state }) => (
        <span
          key={id}
          style={{ top: `${topPct}%`, left: `${leftPct}%`, transform: `translate(-50%, -50%) rotate(${rot}deg)`, ['--type-ms' as any]: '2.2s' }}
          className={[
            'absolute font-mono text-xs md:text-sm lg:text-base text-foreground/70',
            state==='enter' ? 'fade-in type' : '',
            state==='exit' ? 'fade-out' : ''
          ].join(' ')}
        >{text}</span>
      ))}
    </div>
  );
}
