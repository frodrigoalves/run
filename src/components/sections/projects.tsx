'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useLocalization } from '@/hooks/use-localization';
import { projectsData } from '@/lib/data';
import { PlayCircle } from 'lucide-react';

export default function Projects() {
  const { t } = useLocalization();

  const sectionTitle = {
    pt: 'Projetos em Destaque',
    en: 'Featured Projects',
  };

  return (
    <section id="projects" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12">{t(sectionTitle)}</h2>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
      >
        <CarouselContent>
          {projectsData.map((project) => (
            <CarouselItem key={project.id} className="md:basis-1/2">
              <div className="p-1">
                <Card className="overflow-hidden group border-0 glass-effect">
                  <CardContent className="p-0 relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${project.embedId}?showinfo=0&controls=1&rel=0`}
                      title={t(project.title)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                     <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-300 flex flex-col justify-end p-4">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <PlayCircle className="w-16 h-16 text-white/70" />
                        </div>
                        <h3 className="text-lg font-semibold text-white drop-shadow-md truncate">{t(project.title)}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 sm:left-[-50px] top-1/2 -translate-y-1/2 fill-foreground/50 stroke-background/50 z-10" />
        <CarouselNext className="absolute right-0 sm:right-[-50px] top-1/2 -translate-y-1/2 fill-foreground/50 stroke-background/50 z-10" />
      </Carousel>
    </section>
  );
}
