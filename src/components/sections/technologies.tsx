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
    <section id="tech" className="py-16 md:py-24">
      <h2 className="text-3xl font-bold text-white text-center mb-12">{t(title)}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center gap-2 text-center transition-transform hover:scale-110">
            <Image
              src={tech.icon}
              alt={tech.name}
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <span className="font-medium text-slate-300">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
