import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Gpts from '@/components/sections/gpts';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import Footer from '@/components/footer';
import FloatingButtons from '@/components/floating-buttons';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="py-4 text-center">
        <Link href="/" className="inline-block p-2 rounded-full hover:bg-accent transition-colors" aria-label="Voltar para a página inicial">
          <Home className="h-6 w-6 text-foreground" />
        </Link>
      </header>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
              {/* Coluna Principal */}
              <div className="lg:col-span-2 space-y-16">
                <Projects />
                <Gpts />
              </div>

              {/* Barra Lateral */}
              <aside className="space-y-16">
                <About />
                <Technologies />
                <Certifications />
              </aside>
            </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
