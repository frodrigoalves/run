'use client';
import Image from 'next/image';
import { partners } from '@/lib/data';

export default function Partners() {
  // Duplicar a lista de parceiros para criar um efeito de rolagem infinita
  const extendedPartners = [...partners, ...partners];

  return (
    <section className="absolute bottom-24 left-0 w-full z-20 overflow-hidden blur-fade-edges">
      <div className="w-full max-w-5xl mx-auto py-12">
        <div className="w-max flex logo-strip">
          {extendedPartners.map((partner, index) => (
            <div key={index} className="flex-shrink-0 px-8">
              <div className="flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={80}
                  data-ai-hint={partner.hint}
                  className="w-32 h-16 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
