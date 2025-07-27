'use client';

import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Gpts from '@/components/sections/gpts';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import Partners from '@/components/sections/partners';
import { HeroAnimationProvider } from '@/contexts/hero-animation-context';
import TopBar from '@/components/top-bar';
import { Bubble } from '@typebot.io/nextjs';


function PortfolioChatbot() {
  return (
    <Bubble
      typebot="rodrigoalves"
      apiHost="https://painelapi.respostainteligente.online"
      theme={{
        placement: 'right',
        button: {
          backgroundColor: '#FFFFFF',
          customIconSrc:
            "data:image/svg+xml;utf8,<svg fill='%234A8BB2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z'/></svg>",
          size: 'medium',
        },
      }}
    />
  );
}


function HomePageContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar showNav={true} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 pt-32 md:px-6 md:py-20 lg:py-24">
            <div id="about">
              <About />
            </div>
            <Separator className="my-8" />
            <div id="projects">
              <Projects />
            </div>
            <Separator className="my-8" />
            <div id="gpts">
              <Gpts />
            </div>
            <Separator className="my-8" />
            <Partners />
            <Separator className="my-8" />
            <div id="tech" className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                <Technologies />
                <Certifications />
            </div>
        </div>
      </main>

      <Footer />
      <PortfolioChatbot />
    </div>
  );
}

export default function HomePage() {
  return (
    <HeroAnimationProvider>
      <HomePageContent />
    </HeroAnimationProvider>
  );
}
