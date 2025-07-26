'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useLocalization } from '@/hooks/use-localization';

interface ContactDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ContactDrawer({ isOpen, onOpenChange }: ContactDrawerProps) {
  const { t } = useLocalization();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-slate-800/95 backdrop-blur-lg text-white border-l-slate-700 w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-primary">{t({ pt: 'Contato & Orçamentos', en: 'Contact & Quotes' })}</SheetTitle>
        </SheetHeader>
        <div className="p-1 py-6">
          <h3 className="text-lg font-semibold mb-2">{t({ pt: 'Vamos criar juntos?', en: 'Let\'s build together?' })}</h3>
          <p className="text-sm text-slate-400 mb-4">
            {t({ 
              pt: 'Este é um espaço para solicitações de ideias, criação, aprimoramento e ampliações para qualquer tipo de projeto digital, Web3, consultorias e orientações.', 
              en: 'This is a space for requesting ideas, creation, improvement, and expansion for any type of digital project, Web3, consulting, and guidance.' 
            })}
          </p>
          <form action="https://formspree.io/f/mayvzjga" method="POST" className="space-y-4">
            <Input type="text" name="name" placeholder={t({ pt: 'Nome', en: 'Name' })} required className="bg-slate-700 border-slate-600 placeholder:text-slate-400 focus:ring-primary" />
            <Input type="email" name="email" placeholder={t({ pt: 'Email', en: 'Email' })} required className="bg-slate-700 border-slate-600 placeholder:text-slate-400 focus:ring-primary" />
            <Textarea name="message" rows={5} placeholder={t({ pt: 'Descreva sua ideia, necessidade ou projeto...', en: 'Describe your idea, need, or project...' })} required className="bg-slate-700 border-slate-600 placeholder:text-slate-400 focus:ring-primary" />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white w-full transition-transform hover:scale-105">
              {t({ pt: 'Enviar Solicitação', en: 'Send Request' })}
            </Button>
          </form>
          <div className="mt-8 border-t border-slate-700 pt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">{t({ pt: 'Vamos conversar?', en: 'Let\'s talk?' })}</h3>
            <p className="text-sm text-slate-400 mb-4">
              {t({ 
                pt: 'Estou aqui para ajudar a quebrar barreiras no seu negócio, sem custo inicial. Agendar uma chamada é a melhor forma de começarmos.', 
                en: 'I\'m here to help break down barriers in your business, at no initial cost. Scheduling a call is the best way for us to start.' 
              })}
            </p>
            <Button asChild variant="secondary" className="w-full transition-colors">
              <a href="https://cal.com/rodrigo-alves-w3ai/15min" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-4 w-4" />
                {t({ pt: 'Agendar Chamada Gratuita', en: 'Schedule Free Call' })}
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
