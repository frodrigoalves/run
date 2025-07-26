'use client';

import { MatrixEffect } from '@/components/matrix-effect';
import { useLocalization } from '@/hooks/use-localization';
import { useState, useEffect } from 'react';

const allMatrixStrings = [
  ["system.init()", "usr/bin/security"],
  ["load: /blockchain/modules", "booting: SingulAI"],
  ["ACCESS GRANTED", "render:portfolio.interactive"],
  ["0x5a2e...c8a4", "eth_send"],
  ["running diagnostics", "kernel_panic: false"],
  ["decrypting_data", "auth_success"],
];

export default function Hero() {
  const { lang } = useLocalization();
  
  const [activeMatrixIndex, setActiveMatrixIndex] = useState(0);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [featuredMatrixIndex, setFeaturedMatrixIndex] = useState(0);


  const titles = {
    pt: ["Desenvolvedor Web3", "Especialista em IA", "Advogado & Criador do SingulAI"],
    en: ["Web3 Developer", "AI Specialist", "Lawyer & Creator of SingulAI"]
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMatrixIndex(prev => (prev + 1) % allMatrixStrings.length);
      setActiveSubtitleIndex(prev => (prev + 1) % titles[lang].length);
      setFeaturedMatrixIndex(Math.floor(Math.random() * allMatrixStrings.length));
    }, 1500); 

    return () => clearInterval(interval);
  }, [lang, titles]);


  return (
    <header className="absolute inset-0 text-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
       <div className="absolute top-1/4 left-8 opacity-0 animate-fade-in-delay-1 md:left-16">
        <MatrixEffect 
          strings={[titles[lang][activeSubtitleIndex]]}
          isFeatured={featuredMatrixIndex === 0}
        />
      </div>
       <div className="absolute top-1/2 right-12 opacity-0 animate-fade-in-delay-2 hidden md:block md:right-24">
        <MatrixEffect 
          strings={allMatrixStrings[1]}
          isFeatured={featuredMatrixIndex === 1}
        />
      </div>
       <div className="absolute bottom-24 right-16 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[3]}
          isFeatured={featuredMatrixIndex === 3}
        />
      </div>
       <div className="absolute bottom-1/3 left-12 opacity-0 animate-fade-in-delay-2 hidden md:block md:left-24">
        <MatrixEffect 
          strings={allMatrixStrings[2]}
          isFeatured={featuredMatrixIndex === 2}
        />
      </div>
       <div className="absolute top-16 left-1/3 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[4]}
          isFeatured={featuredMatrixIndex === 4}
        />
      </div>
      <div className="absolute top-2/3 right-1/4 opacity-0 animate-fade-in-delay-3">
         <MatrixEffect 
          strings={[titles[lang][(activeSubtitleIndex + 1) % titles[lang].length]]}
          isFeatured={featuredMatrixIndex === 5}
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">
      </div>
    </header>
  );
}
