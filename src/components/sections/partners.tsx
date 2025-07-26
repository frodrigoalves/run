'use client';
import Image from 'next/image';
import { partners } from '@/lib/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

export default function Partners() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="w-full max-w-5xl mx-auto py-12 absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
       <Carousel
          plugins={[plugin.current]}
          opts={{
              align: "start",
              loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
      >
          <CarouselContent className="-ml-4">
              {partners.map((partner, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="flex aspect-video items-center justify-center p-6">
                           <Image
                              src={partner.logo}
                              alt={partner.name}
                              width={160}
                              height={80}
                              data-ai-hint={partner.hint}
                              className="w-40 h-20 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-in-out"
                            />
                        </div>
                      </div>
                  </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 text-foreground" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 text-foreground" />
      </Carousel>
    </section>
  );
}
