import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Gpts from '@/components/sections/gpts';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import Footer from '@/components/footer';
import FloatingButtons from '@/components/floating-buttons';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LocalizedText } from '@/components/localized-text';
import Partners from '@/components/sections/partners';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold" aria-label="Voltar para a página inicial">
            <ArrowLeft className="h-5 w-5" />
            <LocalizedText pt="Início" en="Home" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
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
      <FloatingButtons />
    </div>
  );
}
