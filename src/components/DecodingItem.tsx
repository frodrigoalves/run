'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanding } from '@/context/LandingContext';
import './DecodingItem.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';
const SCRAMBLE_SPEED = 50;
const STATIC_MS = 5000;

/** Word-based decode duration: 2s base + 0.5s per additional word */
function decodeDuration(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return 2000 + Math.max(0, words - 1) * 500;
}

/* ── Types ── */
interface DecodingItemProps {
  label: string;
  isPerson: boolean;
  top: string;
  left: string;
  onDone: () => void;
}

type ItemState = 'decoding' | 'revealing' | 'static' | 'exiting';

/* ── Helpers ── */
function scramble(text: string): string {
  return text
    .split('')
    .map((ch) => (ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join('');
}

/* ── Component ── */
export default function DecodingItem({ label, isPerson, top, left, onDone }: DecodingItemProps) {
  const { globalDecode, globalDecodeLabel } = useLanding();

  // Deterministic placeholder for SSR
  const [display, setDisplay] = useState(label.replace(/[^ ]/g, '·'));
  const [state, setState] = useState<ItemState>('decoding');
  const [progress, setProgress] = useState(0);
  const [activeLabel, setActiveLabel] = useState(label);
  const [mounted, setMounted] = useState(false);

  const hoveredRef = useRef(false);
  const stateRef = useRef<ItemState>('decoding');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  /* Go static → wait → exit */
  const goStatic = useCallback(
    (text: string) => {
      setState('static');
      stateRef.current = 'static';
      setDisplay(text);
      setProgress(100);

      timerRef.current = setTimeout(() => {
        setState('exiting');
        stateRef.current = 'exiting';
        timerRef.current = setTimeout(onDone, 400);
      }, STATIC_MS);
    },
    [onDone],
  );

  /* Char-by-char reveal */
  const startReveal = useCallback(
    (text: string, duration: number) => {
      setState('revealing');
      stateRef.current = 'revealing';
      clear();

      let i = 0;
      const charDelay = duration / text.length;

      function step() {
        if (i >= text.length) {
          goStatic(text);
          return;
        }
        i++;
        setProgress(Math.round((i / text.length) * 100));
        setDisplay(text.slice(0, i) + scramble(text.slice(i)));
        timerRef.current = setTimeout(step, charDelay);
      }
      step();
    },
    [goStatic, clear],
  );

  /* Mount guard */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scramble loop — only after mount */
  useEffect(() => {
    if (!mounted) return;
    intervalRef.current = setInterval(() => {
      if (stateRef.current === 'decoding' && !hoveredRef.current) {
        setDisplay(scramble(activeLabel));
      }
    }, SCRAMBLE_SPEED);

    return clear;
  }, [mounted, activeLabel, clear]);

  /* Hover → start reveal with word-based timing */
  const handleEnter = useCallback(() => {
    if (stateRef.current === 'decoding') {
      hoveredRef.current = true;
      clear();
      startReveal(activeLabel, decodeDuration(activeLabel));
    }
  }, [clear, startReveal, activeLabel]);

  /* ── Global decode trigger (button click) ── */
  useEffect(() => {
    if (globalDecode && globalDecodeLabel) {
      clear();
      setActiveLabel(globalDecodeLabel);

      // Reset to decoding briefly then fast reveal (0.5s)
      setState('decoding');
      stateRef.current = 'decoding';

      // Stagger each item slightly for visual wave
      const delay = 100 + Math.random() * 400;
      timerRef.current = setTimeout(() => {
        startReveal(globalDecodeLabel, 500);
      }, delay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalDecode, globalDecodeLabel]);

  return (
    <div
      onMouseEnter={handleEnter}
      onTouchStart={handleEnter}
      className="decoding-item-container pointer-events-auto"
      data-state={state}
      ref={(el) => {
        if (el) {
          el.style.top = top;
          el.style.left = left;
        }
      }}
    >
      <span className="decoding-item-text" data-state={state}>
        {display}
      </span>

      {isPerson && state !== 'exiting' && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3 h-3 flex-shrink-0 transition-colors duration-300 ${
            state === 'static'
              ? 'animate-heartbeat text-pink-300'
              : 'opacity-20'
          }`}
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}

      {state !== 'static' && state !== 'exiting' && (
        <span
          className="decoding-item-progress"
          ref={(el) => {
            if (el) {
              el.style.width = `${progress}%`;
            }
          }}
        />
      )}
    </div>
  );
}
