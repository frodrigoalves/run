import { LocalizationProvider } from '@/components/localization-provider';
import Hero from '@/components/sections/hero';

export default function Home() {
  return (
    <LocalizationProvider>
      <div className="flex min-h-screen flex-col">
        <Hero />
      </div>
    </LocalizationProvider>
  );
}
