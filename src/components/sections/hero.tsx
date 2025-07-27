'use client';

import { MatrixEffect } from '@/components/matrix-effect';
import { useLocalization } from '@/hooks/use-localization';
import { useState, useEffect } from 'react';

const allMatrixStrings = [
  ["system.init()", "usr/bin/security"],
  ["load: /blockchain/modules", "booting: SingulAI"],
  ["Pedro|Laura", "Leticia"],
  ["0x5a2e...c8a4", "eth_send"],
  ["running diagnostics", "kernel_panic: false"],
  ["decrypting_data", "auth_success"],
  ["Web3", "AI Specialist"],
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
      
       <div className="absolute top-[20%] md:top-[35%] left-[10%] md:left-1/4 opacity-0 animate-fade-in-delay-1">
        <MatrixEffect 
          strings={allMatrixStrings[2]}
          isFeatured={true}
          showOnlyWhenComplete={true}
          loopAfter={4000}
        />
      </div>
       <div className="absolute top-1/4 right-[15%] md:right-1/4 opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[1]}
          isFeatured={featuredMatrixIndex === 1}
        />
      </div>
       <div className="absolute bottom-1/4 right-[10%] md:right-1/4 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[3]}
          isFeatured={featuredMatrixIndex === 3}
        />
      </div>
       <div className="absolute top-1/3 left-[10%] md:left-[15%] opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[activeMatrixIndex === 2 ? 0 : activeMatrixIndex]}
          isFeatured={featuredMatrixIndex === 2}
        />
      </div>
       <div className="absolute bottom-[20%] md:bottom-1/4 left-[15%] md:left-1/4 opacity-0 animate-fade-in-delay-4">
        <MatrixEffect 
          strings={allMatrixStrings[4]}
          isFeatured={featuredMatrixIndex === 4}
        />
      </div>
      <div className="absolute bottom-[35%] right-[10%] md:right-[20%] opacity-0 animate-fade-in-delay-3">
         <MatrixEffect 
          strings={[titles[lang][(activeSubtitleIndex + 1) % titles[lang].length]]}
          isFeatured={featuredMatrixIndex === 5}
        />
      </div>
       <div className="absolute top-1/2 left-[30%] -translate-y-1/2 opacity-0 animate-fade-in-delay-3 hidden md:block">
        <MatrixEffect 
          strings={allMatrixStrings[6]}
          isFeatured={featuredMatrixIndex === 6}
        />
      </div>
      <div className="absolute top-1/2 right-1/2 md:right-[30%] translate-x-1/2 md:translate-x-0 -translate-y-1/2 opacity-0 animate-fade-in-delay-1">
         <MatrixEffect 
          strings={["Rodrigo Alves"]}
          isFeatured={true}
          loopAfter={5000}
        />
      </div>


      <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">
      </div>
    </header>
  );
}
