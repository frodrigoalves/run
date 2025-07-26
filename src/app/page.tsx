import { LocalizationProvider } from '@/components/localization-provider';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Technologies from '@/components/sections/technologies';
import Projects from '@/components/sections/projects';
import Gpts from '@/components/sections/gpts';
import Certifications from '@/components/sections/certifications';
import Partners from '@/components/sections/partners';
import Footer from '@/components/footer';
import FloatingButtons from '@/components/floating-buttons';

export default function Home() {
  return (
    <LocalizationProvider>
      <div className="flex min-h-screen flex-col">
        <Hero />
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
          <Technologies />
          <Projects />
          <Gpts />
          <Certifications />
          <Partners />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </LocalizationProvider>
  );
}
