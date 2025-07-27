'use client';
import Image from 'next/image';
import { useLocalization } from '@/hooks/use-localization';
import { technologies } from '@/lib/data';

export default function Technologies() {
  const { t } = useLocalization();

  const title = {
    pt: 'Tecnologias',
    en: 'Technologies',
  };

  return (
    <section id="tech" className="py-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-8">{t(title)}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center gap-2 text-center transition-transform hover:scale-110 group">
            <Image
              src={tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className="h-8 w-8 grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <span className="font-medium text-muted-foreground text-sm">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
