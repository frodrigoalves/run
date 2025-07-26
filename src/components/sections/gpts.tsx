'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/use-localization';
import { gptsData } from '@/lib/data';
import { ArrowRight, Scale, ShieldCheck, Search, Book, BarChart, Building } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  scale: Scale,
  'shield-check': ShieldCheck,
  search: Search,
  book: Book,
  'bar-chart': BarChart,
  building: Building,
};

export default function Gpts() {
  const { t } = useLocalization();

  const sectionTitle = {
    pt: 'Assistentes GPT Customizados',
    en: 'Custom GPT Assistants',
  };

  const sectionDescription = {
      pt: 'Soluções de IA personalizadas, treinadas para tarefas específicas em diversos setores.',
      en: 'Custom AI solutions, trained for specific tasks across various industries.',
  }

  const buttonText = {
    pt: 'Acessar GPT',
    en: 'Access GPT',
  };

  return (
    <section id="gpts" className="py-8">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t(sectionTitle)}</h2>
            <p className="text-lg text-muted-foreground">{t(sectionDescription)}</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {gptsData.map((gpt) => {
          const Icon = icons[gpt.icon];
          return (
            <Card key={gpt.id} className="glass-effect rounded-xl flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="bg-secondary p-3 rounded-lg mt-1 flex-shrink-0">
                  {Icon && <Icon className="h-8 w-8 text-accent-foreground" strokeWidth={1.5} />}
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">{t(gpt.title)}</CardTitle>
                  <CardDescription className="text-sm mt-1">{t(gpt.description)}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent/80 hover:bg-accent text-accent-foreground font-semibold transition-colors">
                  <a href={gpt.link} target="_blank" rel="noopener noreferrer">
                    {t(buttonText)} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
