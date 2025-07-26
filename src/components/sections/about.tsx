'use client';
import { useLocalization } from '@/hooks/use-localization';

export default function About() {
  const { t } = useLocalization();

  const title = {
    pt: 'Um desenvolvedor que une Direito, IA e Blockchain para criar soluções inovadoras.',
    en: 'A developer combining Law, AI, and Blockchain to create innovative solutions.',
  };

  const description = {
    pt: 'Com background em direito e paixão por tecnologia, meu foco é desenvolver automações, chatbots e integrações que não apenas otimizam processos, mas também garantem segurança e eficiência. Atuo na intersecção entre a lógica jurídica e o poder da inteligência artificial para construir aplicações com propósito.',
    en: 'With a background in law and a passion for technology, my focus is on developing automations, chatbots, and integrations that not only optimize processes but also ensure security and efficiency. I operate at the intersection of legal logic and the power of artificial intelligence to build purposeful applications.',
  };

  return (
    <section id="about" className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6">
            {t(title)}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
            {t(description)}
        </p>
      </div>
    </section>
  );
}
