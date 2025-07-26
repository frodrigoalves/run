'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TypedEffect from '@/components/typed-effect';
import { useLocalization } from '@/hooks/use-localization';
import type { Language } from '@/components/localization-provider';

export default function Hero() {
  const { lang, changeLang } = useLocalization();

  const titles = {
    pt: ["Desenvolvedor Web3", "Especialista em IA", "Advogado & Criador do SingulAI"],
    en: ["Web3 Developer", "AI Specialist", "Lawyer & Creator of SingulAI"]
  };

  const handleLangChange = (newLang: Language) => {
    changeLang(newLang);
  };

  return (
    <header className="py-16 text-center relative overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="relative z-10">
        <Image
          src="https://placehold.co/128x128.png"
          alt="Foto de Rodrigo Alves Ferreira"
          width={128}
          height={128}
          data-ai-hint="profile photo"
          className="w-32 h-32 rounded-full mx-auto border-4 border-slate-600 shadow-xl mb-4 object-cover"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white">Rodrigo Alves Ferreira</h1>
        <p className="text-lg md:text-xl text-primary mt-2">
          <TypedEffect strings={titles[lang]} />
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button
            onClick={() => handleLangChange('pt')}
            variant={lang === 'pt' ? 'default' : 'secondary'}
            className="transition-transform hover:scale-105"
          >
            🇧🇷 Português
          </Button>
          <Button
            onClick={() => handleLangChange('en')}
            variant={lang === 'en' ? 'default' : 'secondary'}
            className="transition-transform hover:scale-105"
          >
            🇬🇧 English
          </Button>
        </div>
      </div>
    </header>
  );
}
