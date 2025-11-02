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
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">{t(sectionTitle)}</h2>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl"
      >
        <CarouselContent>
          {projectsData.map((project) => (
            <CarouselItem key={project.id} className="sm:basis-3/4 md:basis-1/2 xl:basis-1/3">
              <div className="p-1">
                <Card className="group overflow-hidden border-0 glass-effect">
                  <CardContent className="relative aspect-video overflow-hidden rounded-2xl bg-black/30 p-0">
                    <iframe
                      className="h-full w-full rounded-2xl"
                      src={`https://www.youtube.com/embed/${project.embedId}?showinfo=0&controls=1&rel=0`}
                      title={t(project.title)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/40 group-hover:via-black/5" />
                    <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/5" aria-hidden="true" />
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3 p-4 text-left">
                      <div className="flex items-center justify-between text-white/80">
                        <h3 className="text-base font-semibold leading-tight drop-shadow-md sm:text-lg">{t(project.title)}</h3>
                        <PlayCircle className="h-10 w-10 opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/40">YouTube</p>
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
