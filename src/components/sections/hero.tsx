
'use client';

import { MatrixEffect } from '@/components/matrix-effect';
import { useState, useEffect } from 'react';

const allMatrixStrings = [
  "Advogado Direito Digital",
  "Especialista em IA",
  "CEO & Founder SingulAI",
  "Web3",
  "Blockchain",
  "Pedro, Laura & Letícia",
  "eth_send",
  "system.init()",
  "running diagnostics",
  "auth_success",
  "decrypting_data",
  "0x5a2e...c8a4",
];

const longCodeStrings = [
    "0x_a8b3_4c1f_e29d_7851_b4a0_c3ff_d6e5",
    "init_neural_net(layers=[784, 128, 128, 10])",
    "SELECT * FROM contracts WHERE status='active'",
    "eth.sendTransaction({from: 0x..., to: 0x...})",
    "render_component(<MatrixEffect />) -> VNode",
    "Compiling shaders... done. Linking... done.",
    "01100110 01101111 01110010 01100111 01100101",
];

export default function Hero() {
  const [activeMatrixIndices, setActiveMatrixIndices] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const stringChangeInterval = setInterval(() => {
      setActiveMatrixIndices(prevIndices => {
        const newIndices = [...prevIndices];
        const randomIndexToChange = Math.floor(Math.random() * newIndices.length);
        let nextStringIndex = Math.floor(Math.random() * allMatrixStrings.length);
        
        while (newIndices.includes(nextStringIndex)) {
          nextStringIndex = (nextStringIndex + 1) % allMatrixStrings.length;
        }
        
        newIndices[randomIndexToChange] = nextStringIndex;
        return newIndices;
      });
    }, 2000);

    const featuredChangeInterval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % activeMatrixIndices.length);
    }, 1500);

    return () => {
        clearInterval(stringChangeInterval);
        clearInterval(featuredChangeInterval);
    };
  }, [activeMatrixIndices.length]);


  return (
    <header className="absolute inset-0 text-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background opacity-80 z-10"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {/* ===== Depth Effect Decoders ===== */}
      <div className="absolute top-0 left-0 h-full w-20 p-4 hidden md:flex flex-col gap-8 opacity-20 z-0">
          <MatrixEffect strings={[longCodeStrings[0], longCodeStrings[1]]} className="text-xs" loopAfter={8000} />
          <MatrixEffect strings={[longCodeStrings[2], longCodeStrings[3]]} className="text-xs" loopAfter={9000} />
      </div>
      <div className="absolute top-0 right-0 h-full w-20 p-4 hidden md:flex flex-col gap-12 opacity-20 z-0">
          <MatrixEffect strings={[longCodeStrings[4], longCodeStrings[5]]} className="text-xs" loopAfter={8500} />
          <MatrixEffect strings={[longCodeStrings[6], longCodeStrings[0]]} className="text-xs" loopAfter={9500} />
      </div>
      <div className="absolute bottom-4 left-0 right-0 h-8 flex justify-center items-center opacity-20 z-0">
          <MatrixEffect strings={[longCodeStrings.join(' ')]} className="text-xs tracking-widest" loopAfter={15000} />
      </div>


      {/* ===== Glitch Effect Texts ===== */}
      <div className="absolute top-[20%] left-[15%] z-20 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[0]]]}
          isFeatured={featuredIndex === 0}
          loopAfter={4000}
        />
      </div>
      <div className="absolute top-[30%] right-[15%] z-20 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[1]]]}
          isFeatured={featuredIndex === 1}
          loopAfter={3000}
        />
      </div>
      <div className="absolute top-1/3 left-[25%] z-20 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[2]]]}
          isFeatured={featuredIndex === 2}
          loopAfter={2500}
        />
      </div>
      <div className="absolute bottom-1/4 right-[20%] z-20 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[3]]]}
          isFeatured={featuredIndex === 3}
          loopAfter={4000}
        />
      </div>
      <div className="absolute bottom-[20%] left-[20%] z-20 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[4]]]}
          isFeatured={featuredIndex === 4}
          loopAfter={5000}
        />
      </div>
      <div className="absolute bottom-[35%] right-[10%] z-20 hidden md:block">
         <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[5]]]}
          isFeatured={featuredIndex === 5}
          loopAfter={3500}
        />
      </div>
      <div className="absolute top-1/2 left-[30%] -translate-y-1/2 z-20 hidden md:block">
        <MatrixEffect 
          strings={[allMatrixStrings[activeMatrixIndices[6]]]}
          isFeatured={featuredIndex === 6}
          loopAfter={4500}
        />
      </div>
      
      <div className="relative z-30 max-w-4xl mx-auto px-4 flex flex-col items-center">
      </div>
    </header>
  );
}
