import Image from 'next/image';
import { partners } from '@/lib/data';
import { LocalizedText } from '../localized-text';

export default function Partners() {
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="py-10 overflow-hidden">
      <h2 className="text-2xl font-bold text-foreground text-center mb-12">
        <LocalizedText pt="Clientes e Parceiros" en="Clients & Partners" />
      </h2>
      <div className="relative overflow-hidden group">
        <div className="logo-strip group-hover:[animation-play-state:paused]">
          {doubledPartners.map((partner, index) => (
            <div key={index} className="mx-8 flex-shrink-0">
               <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={96}
                data-ai-hint={partner.hint}
                className="w-40 h-24 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
