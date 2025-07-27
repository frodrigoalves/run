'use client';
import Image from 'next/image';
import { useLocalization } from '@/hooks/use-localization';
import { LocalizedText } from './localized-text';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLocalization();

  const quote = {
    pt: 'Esforço é o nome do meu talento.',
    en: 'Effort is the name of my talent.',
  };

  return (
    <footer className="border-t border-border mt-16 py-8 bg-background/50">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/images/perfil.png"
            alt="Rodrigo"
            width={80}
            height={80}
            className="rounded-2xl object-cover border-2 border-primary/50 shadow-lg"
          />
          <div>
            <h3 className="text-lg font-bold text-foreground">Rodrigo</h3>
            <span className="mt-1 text-muted-foreground text-sm">
              {t(quote)}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">&copy; {currentYear} rodrigo.run - <LocalizedText pt="Todos os direitos reservados." en="All rights reserved." /></p>
      </div>
    </footer>
  );
}
