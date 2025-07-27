'use client';

import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Gpts from '@/components/sections/gpts';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import Partners from '@/components/sections/partners';
import FloatingButtons from '@/components/floating-buttons';
import { HeroAnimationProvider } from '@/contexts/hero-animation-context';
import TopBar from '@/components/top-bar';
import { TypebotEmbed } from '@/components/typebot-embed';


function HomePageContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar showNav={true} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 pt-32 md:px-6 md:py-20 lg:py-24">
            <div id="about">
              <About />
            </div>
            <Separator className="my-12 md:my-16" />
            <div id="projects">
              <Projects />
            </div>
            <Separator className="my-12 md:my-16" />
            <div id="gpts">
              <Gpts />
            </div>
            <Separator className="my-12 md:my-16" />
            <Partners />
            <Separator className="my-12 md:my-16" />
            <div id="tech" className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                <Technologies />
                <Certifications />
            </div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
      <TypebotEmbed />
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
