
'use client';

import { MatrixEffect } from '@/components/matrix-effect';
import { useLocalization } from '@/hooks/use-localization';
import { useState, useEffect } from 'react';
import { useHeroAnimation } from '@/contexts/hero-animation-context';

const allMatrixStrings = [
  "system.init()",
  "usr/bin/security",
  "load: /blockchain/modules",
  "booting: SingulAI",
  "0x5a2e...c8a4",
  "eth_send",
  "running diagnostics",
  "kernel_panic: false",
  "decrypting_data",
  "auth_success",
  "Web3",
  "AI Specialist",
];

const tributeNames = ["Pedro|Laura", "Leticia"];

export default function Hero() {
  const { lang } = useLocalization();
  const { isSyncing } = useHeroAnimation();
  
  const [activeMatrixIndices, setActiveMatrixIndices] = useState([0, 1, 2, 3, 4, 5, 6]);
  
  const titles = {
    pt: ["Desenvolvedor Web3", "Especialista em IA", "Advogado & Criador do SingulAI"],
    en: ["Web3 Developer", "AI Specialist", "Lawyer & Creator of SingulAI"]
  };
  
  useEffect(() => {
    if (isSyncing) return;

    const interval = setInterval(() => {
      setActiveMatrixIndices(prevIndices => {
        const newIndices = [...prevIndices];
        const randomIndex = Math.floor(Math.random() * newIndices.length);
        let nextStringIndex = (newIndices[randomIndex] + 1) % allMatrixStrings.length;
        
        // Ensure the new string is not already displayed
        while (newIndices.includes(nextStringIndex)) {
          nextStringIndex = (nextStringIndex + 1) % allMatrixStrings.length;
        }
        
        newIndices[randomIndex] = nextStringIndex;
        return newIndices;
      });
    }, 2000); // Change one of the strings every 2 seconds

    return () => clearInterval(interval);
  }, [isSyncing]);


  return (
    <header className="absolute inset-0 text-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
       <div className="absolute top-[20%] md:top-[35%] left-[10%] md:left-1/4 opacity-0 animate-fade-in-delay-1">
        <MatrixEffect 
          strings={tributeNames}
          isFeatured={true}
          showOnlyWhenComplete={true}
          loopAfter={4000}
        />
      </div>
       <div className="absolute top-1/4 right-[15%] md:right-1/4 opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[1]]]}
          loopAfter={3000}
        />
      </div>
       <div className="absolute bottom-1/4 right-[10%] md:right-1/4 opacity-0 animate-fade-in-delay-4 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[3]]]}
           loopAfter={4000}
        />
      </div>
       <div className="absolute top-1/3 left-[10%] md:left-[15%] opacity-0 animate-fade-in-delay-2 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[2]]]}
           loopAfter={2500}
        />
      </div>
       <div className="absolute bottom-[20%] md:bottom-1/4 left-[15%] md:left-1/4 opacity-0 animate-fade-in-delay-4">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[4]]]}
           loopAfter={5000}
        />
      </div>
      <div className="absolute bottom-[35%] right-[10%] md:right-[20%] opacity-0 animate-fade-in-delay-3">
         <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[5]]]}
           loopAfter={3500}
        />
      </div>
       <div className="absolute top-1/2 left-[30%] -translate-y-1/2 opacity-0 animate-fade-in-delay-3 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[6]]]}
           loopAfter={4500}
        />
      </div>
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">
      </div>
    </header>
  );
}
