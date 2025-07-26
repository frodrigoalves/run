'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/use-localization';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ContactDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ContactDrawer({ isOpen, onOpenChange }: ContactDrawerProps) {
  const { t } = useLocalization();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const idea = formData.get('idea');

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit idea');
      }

      toast({
        title: t({ pt: 'Ideia Enviada!', en: 'Idea Submitted!' }),
        description: t({ pt: 'Sua ideia foi enviada com sucesso. Obrigado!', en: 'Your idea has been successfully submitted. Thank you!' }),
      });
      
      const form = event.target as HTMLFormElement;
      form.reset();

    } catch (error) {
      toast({
        variant: 'destructive',
        title: t({ pt: 'Ocorreu um erro', en: 'An error occurred' }),
        description: t({ pt: 'Não foi possível enviar sua ideia. Tente novamente.', en: 'Could not submit your idea. Please try again.' }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-slate-800/95 backdrop-blur-lg text-white border-l-slate-700 w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-primary">{t({ pt: 'Mural de Ideias', en: 'Idea Mural' })}</SheetTitle>
        </SheetHeader>
        <div className="p-1 py-6">
          <h3 className="text-lg font-semibold mb-2">{t({ pt: 'Compartilhe sua Ideia', en: 'Share Your Idea' })}</h3>
          <p className="text-sm text-slate-400 mb-4">
            {t({ 
              pt: 'Tem uma ideia para um projeto digital, Web3, ou precisa de consultoria? Descreva-a anonimamente abaixo. Interagiremos com as propostas, e quando sentir que podemos ajudar, você decide o próximo passo.', 
              en: 'Have an idea for a digital project, Web3, or need consulting? Describe it anonymously below. We will interact with the proposals, and when you feel we can help, you decide the next step.' 
            })}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea name="idea" rows={5} placeholder={t({ pt: 'Descreva sua ideia, necessidade ou projeto...', en: 'Describe your idea, need, or project...' })} required className="bg-slate-700 border-slate-600 placeholder:text-slate-400 focus:ring-primary" />
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-white w-full transition-transform hover:scale-105">
              {isSubmitting ? t({ pt: 'Enviando...', en: 'Submitting...' }) : t({ pt: 'Enviar Ideia Anônima', en: 'Submit Anonymous Idea' })}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
