'use client';
import { useLocalization } from '@/hooks/use-localization';

export default function About() {
  const { t } = useLocalization();

  const title = {
    pt: 'Sobre Mim',
    en: 'About Me',
  };

  const description = {
    pt: 'Desenvolvedor e especialista em Inteligência Artificial aplicada ao setor jurídico, com sólida experiência em automação de processos, criação de chatbots e integração de APIs. Atuo no desenvolvimento de soluções inovadoras que otimizam o atendimento, aprimoram a eficiência e garantem a segurança digital.',
    en: 'Developer and specialist in Artificial Intelligence applied to the legal sector, with solid experience in process automation, chatbot creation, and API integration. I work on developing innovative solutions that optimize service, improve efficiency, and ensure digital security.',
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{t(title)}</h2>
        <p className="text-lg text-slate-400">{t(description)}</p>
      </div>
    </section>
  );
}
