'use client';

import Link from 'next/link';
import {
  User,
  LayoutGrid,
  Sparkles,
  Cpu,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';
import { useLocalization } from '@/hooks/use-localization';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navLinks = [
  { id: 'about', icon: User, label: { pt: 'Sobre', en: 'About' } },
  { id: 'projects', icon: LayoutGrid, label: { pt: 'Projetos', en: 'Projects' } },
  { id: 'gpts', icon: Sparkles, label: { pt: 'GPTs', en: 'GPTs' } },
  { id: 'tech', icon: Cpu, label: { pt: 'Habilidades', en: 'Skills' } },
];

export default function Header() {
  const { t } = useLocalization();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <TooltipProvider delayDuration={0}>
        <nav className="glass-effect flex items-center gap-2 rounded-full p-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/"
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent/50"
                        aria-label="Voltar para a página inicial"
                    >
                        <ArrowLeft className="h-5 w-5 text-foreground" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{t({ pt: 'Início', en: 'Home' })}</p>
                </TooltipContent>
            </Tooltip>
            
            <div className="h-6 w-px bg-border/50"></div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Tooltip key={link.id}>
                <TooltipTrigger asChild>
                  <a
                    href={`#${link.id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent/50"
                  >
                    <Icon className="h-5 w-5 text-foreground" />
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
    </header>
  );
}
