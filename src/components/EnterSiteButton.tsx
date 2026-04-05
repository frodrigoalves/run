'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useLanding } from '@/context/LandingContext';
import './EnterSiteButton.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

function scramble(text: string): string {
  return text
    .split('')
    .map((ch) => (ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join('');
}

type Phase = 'scramble' | 'reveal' | 'static' | 'fast-reveal' | 'click-scramble' | 'click-reveal' | 'welcome';

export default function EnterSiteButton() {
  const t = useTranslations('landing');
  const { triggerGlobalDecode, buttonVisible, buttonPrompt } = useLanding();

  const enterText = t('enterSite');
  const welcomeText = t('welcome');
  const authorizedText = t('authorized');

  // Deterministic placeholder for SSR — no Math.random()
  const placeholder = enterText.replace(/[^ ]/g, '·');

  const [display, setDisplay] = useState(placeholder);
  const [phase, setPhase] = useState<Phase>('scramble');
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const phaseRef = useRef<Phase>('scramble');
  const hoveredRef = useRef(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount guard — start scramble only client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Keep ref in sync
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  /* ── Phase: SCRAMBLE (standby - 2s of random chars) ── */
  useEffect(() => {
    if (!mounted) return;
    if (phase !== 'scramble') return;
    let cancelled = false;

    const interval = setInterval(() => {
      if (!cancelled) setDisplay(scramble(enterText));
    }, 50);

    const timer = setTimeout(() => {
      if (!cancelled && phaseRef.current === 'scramble') {
        setPhase('reveal');
      }
    }, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [mounted, phase, enterText]);

  /* ── Phase: REVEAL (char-by-char, 2s) ── */
  useEffect(() => {
    if (!mounted) return;
    if (phase !== 'reveal') return;
    let cancelled = false;
    let i = 0;
    const charDelay = 2000 / enterText.length;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      if (cancelled) return;
      if (i >= enterText.length) {
        setPhase('static');
        return;
      }
      i++;
      setDisplay(enterText.slice(0, i) + scramble(enterText.slice(i)));
      timer = setTimeout(step, charDelay);
    }
    step();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mounted, phase, enterText]);

  /* ── Phase: FAST-REVEAL (hover triggered, 0.5s) ── */
  useEffect(() => {
    if (!mounted) return;
    if (phase !== 'fast-reveal') return;
    let cancelled = false;
    let i = 0;
    const charDelay = 500 / enterText.length;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      if (cancelled) return;
      if (i >= enterText.length) {
        setPhase('static');
        return;
      }
      i++;
      setDisplay(enterText.slice(0, i) + scramble(enterText.slice(i)));
      timer = setTimeout(step, charDelay);
    }
    step();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mounted, phase, enterText]);

  /* ── Phase: STATIC (display text for 4s, then restart) ── */
  useEffect(() => {
    if (!mounted) return;
    if (phase !== 'static') return;
    setDisplay(enterText);

    const timer = setTimeout(() => {
      if (!hoveredRef.current && phaseRef.current === 'static') {
        setPhase('scramble');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [phase, enterText]);

  /* ── Phase: CLICK-SCRAMBLE + CLICK-REVEAL (brief scramble → reveal "Welcome") ── */
  useEffect(() => {
    if (phase !== 'click-scramble') return;
    let cancelled = false;
    let scrambleCount = 0;
    let revealTimer: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      if (cancelled) return;
      setDisplay(scramble(welcomeText));
      scrambleCount++;
      if (scrambleCount >= 6) {
        clearInterval(interval);
        // Start char-by-char reveal of welcome text (0.5s)
        let i = 0;
        const charDelay = 500 / welcomeText.length;

        function step() {
          if (cancelled) return;
          if (i >= welcomeText.length) {
            setPhase('welcome');
            return;
          }
          i++;
          setDisplay(welcomeText.slice(0, i) + scramble(welcomeText.slice(i)));
          revealTimer = setTimeout(step, charDelay);
        }
        step();
      }
    }, 50);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(revealTimer);
    };
  }, [phase, welcomeText]);

  /* ── Phase: WELCOME (expanded, trigger global decode after 0.5s) ── */
  useEffect(() => {
    if (phase !== 'welcome') return;
    setDisplay(welcomeText);
    setExpanded(true);

    const timer = setTimeout(() => {
      triggerGlobalDecode(authorizedText);
    }, 500);

    return () => clearTimeout(timer);
  }, [phase, welcomeText, authorizedText, triggerGlobalDecode]);

  /* ── Hover handlers ── */
  const handleMouseEnter = useCallback(() => {
    hoveredRef.current = true;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    if (phaseRef.current === 'scramble') {
      setPhase('fast-reveal');
    }
    // If 'reveal', let it continue
    // If 'static', stay static
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = false;

    if (phaseRef.current === 'static') {
      leaveTimerRef.current = setTimeout(() => {
        if (!hoveredRef.current && phaseRef.current === 'static') {
          setPhase('scramble');
        }
      }, 1000);
    }
  }, []);

  /* ── Click handler ── */
  const handleClick = useCallback(() => {
    if (phaseRef.current === 'welcome' || phaseRef.current === 'click-scramble') return;
    setPhase('click-scramble');
  }, []);

  if (!buttonVisible) return null;

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`enter-site-btn ${expanded ? 'enter-site-btn--expanded' : ''}`}
      data-phase={phase}
      data-prompt={buttonPrompt ? 'true' : 'false'}
    >
      <span className="enter-site-btn__glow" />
      <span className="enter-site-btn__border" />
      <span className="enter-site-btn__text">{mounted ? display : placeholder}</span>
    </button>
  );
}
