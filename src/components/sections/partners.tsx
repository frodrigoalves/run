import Image from 'next/image';
import { partners } from '@/lib/data';
import { LocalizedText } from '../localized-text';

export default function Partners() {
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="absolute bottom-24 left-0 w-full z-20">
      <div 
        className="relative w-full h-32 overflow-hidden"
        style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
        }}
      >
        <div className="logo-strip">
          {doubledPartners.map((partner, index) => (
            <div key={index} className="mx-8 flex-shrink-0 flex items-center justify-center">
               <Image
                src={partner.logo}
                alt={partner.name}
                width={128}
                height={64}
                data-ai-hint={partner.hint}
                className="w-32 h-16 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
