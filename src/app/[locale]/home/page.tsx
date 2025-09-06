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
import { LocalizationProvider } from '@/components/localization-provider';


function HomePageContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar showNav={true} />
       <Bubble
        typebot="rodrigoalves"
        apiHost="https://painelapi.respostainteligente.online"
        theme={{ button: { backgroundColor: "#06B6D4" }, placement: 'right' }}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 pt-20 md:px-6 md:py-20 lg:py-24">
            <div id="about">
              <About />
            </div>
            <Separator className="my-4" />
            <div id="gpts">
              <Gpts />
            </div>
            <Separator className="my-4" />
            <div id="projects">
              <Projects />
            </div>
            <Separator className="my-4" />
            <Partners />
            <Separator className="my-4" />
            <div id="tech" className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                <Technologies />
                <Certifications />
            </div>
        </div>
      </main>

      <div id="footer">
        <Footer />
      </div>
      
    </div>
  );
}

export default function HomePage() {
  return (
    <HeroAnimationProvider>
      <LocalizationProvider>
        <HomePageContent />
      </LocalizationProvider>
    </HeroAnimationProvider>
  );
}
