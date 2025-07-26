'use client';
import Image from 'next/image';
import { useLocalization } from '@/hooks/use-localization';
import { partners } from '@/lib/data';
import { LocalizedText } from '../localized-text';

export default function Partners() {
  const { t } = useLocalization();

  return (
    <section className="py-20 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
        <LocalizedText pt="Clientes e Parceiros" en="Clients & Partners" />
      </h2>
      <div className="relative overflow-hidden group">
        <div className="logo-strip group-hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="mx-8 flex-shrink-0">
                <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={96}
                    data-ai-hint={partner.hint}
                    className="w-40 h-24 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
      </div>
    </section>
  );
}
