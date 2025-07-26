'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocalization } from '@/hooks/use-localization';
import { projectsData } from '@/lib/data';

export default function Projects() {
  const { t } = useLocalization();

  const sectionTitle = {
    pt: 'Projetos em Destaque',
    en: 'Featured Projects',
  };

  return (
    <section id="projects" className="py-8">
      <h2 className="text-3xl font-bold text-foreground text-left mb-12">{t(sectionTitle)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <Card key={project.id} className="glass-effect overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 border-transparent hover:border-primary">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${project.embedId}`}
                  title={t(project.title)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-foreground font-semibold truncate text-xl">{t(project.title)}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
