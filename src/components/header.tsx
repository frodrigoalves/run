'use client';

import Link from 'next/link';
import {
  User,
  LayoutGrid,
  Cpu,
  AtSign,
  Bot,
} from 'lucide-react';
import { useLocalization } from '@/hooks/use-localization';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MatrixEffect } from './matrix-effect';

const navLinksLeft = [
  { id: 'about', icon: User, label: { pt: 'Sobre', en: 'About' } },
  { id: 'projects', icon: LayoutGrid, label: { pt: 'Projetos', en: 'Projects' } },
];

const navLinksRight = [
    { id: 'gpts', icon: Cpu, label: { pt: 'Assistentes de IA', en: 'AI Assistants' } },
    { id: 'footer', icon: AtSign, label: { pt: 'Contato', en: 'Contact' } },
];

declare global {
    interface Window {
      typebot: {
        open: () => void;
        close: () => void;
      }
    }
}

export default function Header() {
  const { t } = useLocalization();

  const handleChatOpen = () => {
    if (window.typebot) {
      window.typebot.open();
    }
  };

  return (
      <TooltipProvider delayDuration={0}>
        <nav className="flex items-center justify-center gap-2">
          {navLinksLeft.map((link) => {
            const Icon = link.icon;
            return (
              <Tooltip key={link.id}>
                <TooltipTrigger asChild>
                  <a
                    href={`#${link.id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent/50"
                  >
                    <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                    <span className="sr-only">{t(link.label)}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(link.label)}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
          
          <div className="h-10 w-20 flex items-center justify-center">
            <Link href="/" aria-label="Voltar para a página inicial">
               <MatrixEffect 
                strings={["run"]}
                isFeatured={true}
                className="text-lg font-bold"
                characterSet={'*+<>/'.split('')}
              />
            </Link>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
                <button
                onClick={handleChatOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent/50"
                >
                <Bot className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                <span className="sr-only">{t({pt: 'Abrir Chat', en: 'Open Chat'})}</span>
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{t({pt: 'Abrir Chat', en: 'Open Chat'})}</p>
            </TooltipContent>
          </Tooltip>

          {navLinksRight.map((link) => {
            const Icon = link.icon;
            return (
              <Tooltip key={link.id}>
                <TooltipTrigger asChild>
                  <a
                    href={`#${link.id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent/50"
                  >
                    <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                    <span className="sr-only">{t(link.label)}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(link.label)}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
  );
}
