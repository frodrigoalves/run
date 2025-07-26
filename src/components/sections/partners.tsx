'use client';
import Image from 'next/image';
import { partners } from '@/lib/data';

export default function Partners() {
  const numPartners = partners.length;
  // Ajuste o raio conforme necessário para o espaçamento
  const radius = numPartners * 25; 

  return (
    <section className="absolute bottom-24 left-0 w-full z-20 flex justify-center items-center">
      <div className="carousel-container">
        <div className="carousel" style={{ transformStyle: 'preserve-3d' }}>
          {partners.map((partner, index) => {
            const angle = (index / numPartners) * 360;
            const style = {
              transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
            };

            return (
              <div key={index} className="carousel-item" style={style}>
                 <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={128}
                  height={64}
                  data-ai-hint={partner.hint}
                  className="w-32 h-16 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-in-out"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}