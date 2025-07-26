'use client';
import { useLocalization } from '@/hooks/use-localization';

export default function About() {
  const { t } = useLocalization();

  const title = {
    pt: 'Sobre Mim',
    en: 'About Me',
  };

  const description = {
    pt: 'Desenvolvedor e especialista em Inteligência Artificial com background em direito. Tenho sólida experiência em automação de processos, criação de chatbots e integração de APIs. Atuo no desenvolvimento de soluções inovadoras que otimizam o atendimento, aprimoram a eficiência e garantem a segurança digital.',
    en: 'Developer and specialist in Artificial Intelligence with a background in law. I have solid experience in process automation, chatbot creation, and API integration. I work on developing innovative solutions that optimize service, improve efficiency, and ensure digital security.',
  };
  
  const listTitle = {
    pt: 'Especialista em:',
    en: 'Specialist in:',
  }

  const areas = {
      pt: ['Web3 + Smart Contracts', 'Chatbots e automações com GPT', 'Branding e criativos visuais', 'Desenvolvimento de interfaces imersivas'],
      en: ['Web3 + Smart Contracts', 'Chatbots and automations with GPT', 'Branding and visual creatives', 'Immersive interface development'],
  }

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">{t(title)}</h2>
        <p className="text-lg text-muted-foreground">{t(description)}</p>
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">{t(listTitle)}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-foreground/90">
                {areas[t({pt: 'pt', en: 'en'})].map(area => (
                    <li key={area} className="glass-effect p-4 rounded-lg">{area}</li>
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
}
