import { LocalizationProvider } from '@/components/localization-provider';
import About from '@/components/sections/about';
import Certifications from '@/components/sections/certifications';
import Gpts from '@/components/sections/gpts';
import Partners from '@/components/sections/partners';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
import Footer from '@/components/footer';
import FloatingButtons from '@/components/floating-buttons';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <LocalizationProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <About />
            <Separator className="my-12" />
            <Technologies />
            <Separator className="my-12" />
            <Projects />
            <Separator className="my-12" />
            <Gpts />
            <Separator className="my-12" />
            <Certifications />
          </div>
          <Partners />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </LocalizationProvider>
  );
}
