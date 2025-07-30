'use client';
import { useEffect, useRef } from 'react';
const ICONS = ['⚡','🔗','⛓','🧠'];

export default function IconsDrift() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // sem animações
    let raf = 0, t = 0;
    const el = ref.current!;
    const step = () => { t+=0.002; el.style.setProperty('--t', String(t)); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 -z-10 opacity-30">
      {Array.from({length: 14}).map((_,i)=>{
        const icon = ICONS[i % ICONS.length];
        const top = 10 + (i*6)%80; const left = 8 + (i*9)%84; const size = 20 + (i%3)*6;
        return (
          <span key={i} style={{ top:`${top}%`, left:`${left}%`, fontSize:`${size}px`, transform:`translate(-50%, -50%) translateY(calc(sin(var(--t)+${i})*6px))` }} className="absolute select-none">
            {icon}
          </span>
        );
      })}
    </div>
  );
}
