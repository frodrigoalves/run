'use client';
import { useLocalization } from '@/hooks/use-localization';
import { LocalizedText } from './localized-text';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Copy } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/rodrigoalves2112', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
    { name: 'GitHub', url: 'https://github.com/frodrigoalves', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
    { name: 'Telegram', url: 'https://t.me/RodrigoAlvesF', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.155 8.232l-1.984 9.31c-.132.623-.466.774-.984.485l-3.008-2.208-1.458 1.401c-.161.161-.297.296-.534.296l.208-3.059 5.619-5.074c.242-.213-.04-.33-.36-.119l-7.019 4.44-2.982-.929c-.616-.192-.626-.632.12-..932l11.416-4.432c.51-.198.924.127.765.845z"/></svg> },
];

const WALLET_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLocalization();
  const { toast } = useToast();
  
  const [isCopied, setIsCopied] = useState(false);

  const quote = {
    pt: 'Esforço é o nome do meu talento.',
    en: 'Effort is the name of my talent.',
  };
  
  const connectTitle = {
    pt: 'Conecte-se',
    en: 'Connect'
  };

  const walletTitle = {
    pt: 'Carteira (ETH/Polygon/BSC)',
    en: 'Wallet (ETH/Polygon/BSC)',
  };

  const copySuccess = {
    pt: 'Endereço copiado para a área de transferência!',
    en: 'Address copied to clipboard!'
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    toast({
        title: t(copySuccess),
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  return (
    <footer className="relative border-t border-border/50 mt-16 py-8 pb-16 md:pb-8 bg-background/50 glass-effect">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side */}
        <div className="flex items-center gap-4">
            <Image 
                src="/images/perfil.png"
                alt="Rodrigo Alves Ferreira"
                width={64}
                height={64}
                className='rounded-full'
            />
            <div>
              <h3 className="text-lg font-bold text-foreground">Rodrigo Alves Ferreira</h3>
              <span className="text-muted-foreground text-sm italic">
                  "{t(quote)}"
              </span>
            </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-col items-center md:items-end gap-2">
                <h4 className='text-md font-semibold text-foreground'>{t(connectTitle)}</h4>
                <div className="flex items-center gap-3">
                    {socialLinks.map(link => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" 
                           aria-label={link.name}
                           className="text-muted-foreground hover:text-primary transition-colors duration-300">
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 text-sm">
                <h4 className='text-md font-semibold text-foreground flex items-center gap-2'><Wallet size={16}/> {t(walletTitle)}</h4>
                <div 
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted"
                    onClick={handleCopy}
                >
                    <span className="font-mono text-muted-foreground text-xs">{`${WALLET_ADDRESS.substring(0, 6)}...${WALLET_ADDRESS.substring(WALLET_ADDRESS.length - 4)}`}</span>
                    <Copy size={14} className={isCopied ? 'text-green-500' : 'text-muted-foreground'}/>
                </div>
            </div>
        </div>
      </div>
      
      {/* Copyright - Absolute Position */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <p className="text-xs text-muted-foreground">&copy; {currentYear} rodrigo.run - <LocalizedText pt="Todos os direitos reservados." en="All rights reserved." /></p>
      </div>
    </footer>
  );
}
