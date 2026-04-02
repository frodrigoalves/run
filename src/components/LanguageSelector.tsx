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
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 px-1 py-1 backdrop-blur-md bg-white/5">
      {locales.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => switchTo(id)}
          aria-label={`Switch to ${label}`}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium tracking-widest transition-all duration-200 font-sans ${
            locale === id
              ? 'bg-white/15 text-white'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          <GlobeIcon />
          {label}
        </button>
      ))}
    </div>
  );
}
