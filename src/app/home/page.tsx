import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Gpts from '@/components/sections/gpts';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { LocalizedText } from '@/components/localized-text';
import Partners from '@/components/sections/partners';
import { TypebotEmbed } from '@/components/typebot-embed';
import FloatingButtons from '@/components/floating-buttons';
import Header from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 pt-32 md:px-6 md:py-20 lg:py-24">
            <About />
            <Separator className="my-16 md:my-24" />
            <Projects />
            <Separator className="my-16 md:my-24" />
            <Gpts />
            <Separator className="my-16 md:my-24" />
            <Partners />
            <Separator className="my-16 md:my-24" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                <Technologies />
                <Certifications />
            </div>
        </div>
      </main>

      <Footer />
      <TypebotEmbed />
      <FloatingButtons />
    </div>
  );
}
