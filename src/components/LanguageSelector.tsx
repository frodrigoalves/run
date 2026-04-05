'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

function GlobeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const locales = [
  { id: 'en', label: 'EN' },
  { id: 'pt', label: 'PT' },
] as const;

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLocale: string) => {
    // pathname is like /en, /en/test, /pt/test
    const segments = pathname.split('/');
    if (['en', 'pt'].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || `/${newLocale}`);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-1 backdrop-blur-xl shadow-sm shadow-slate-950/20">
      {locales.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => switchTo(id)}
          aria-label={`Switch to ${label}`}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] transition-all duration-200 font-sans ${
            locale === id
              ? 'bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]'
              : 'text-white/40 hover:text-white/80 hover:bg-white/10'
          }`}
        >
          <GlobeIcon size={12} />
          {label}
        </button>
      ))}
    </div>
  );
}
