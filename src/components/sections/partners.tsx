'use client';
import Image from 'next/image';
import { partners } from '@/lib/data';

export default function Partners() {
  const allPartners = [...partners, ...partners];

  return (
    <section className="absolute bottom-24 left-0 w-full z-20 overflow-hidden">
      <div className="w-full inline-block whitespace-nowrap logo-strip">
        <div className="flex animate-[scrollX_40s_linear_infinite] hover:[animation-play-state:paused]">
          {allPartners.map((partner, index) => (
            <div key={index} className="inline-block mx-8">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={128}
                height={64}
                data-ai-hint={partner.hint}
                className="w-32 h-16 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
