'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
      onOpenChange(false);

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
          <p className="text-sm text-slate-400 mb-4">
            {t({ 
              pt: 'Tem uma ideia para um projeto, uma necessidade de negócio ou busca consultoria? Descreva-a anonimamente abaixo. As ideias são um espaço para interação mútua. Quando sentir que posso ajudar, você decide o próximo passo.', 
              en: 'Have an idea for a project, a business need, or are you looking for consulting? Describe it anonymously below. Ideas are a space for mutual interaction. When you feel I can help, you decide the next step.' 
            })}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea name="idea" rows={8} placeholder={t({ pt: 'Descreva sua ideia, necessidade ou projeto...', en: 'Describe your idea, need, or project...' })} required className="bg-slate-700 border-slate-600 placeholder:text-slate-400 focus:ring-primary" />
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-white w-full transition-transform hover:scale-105">
              {isSubmitting ? t({ pt: 'Enviando...', en: 'Submitting...' }) : t({ pt: 'Enviar Ideia Anônima', en: 'Submit Anonymous Idea' })}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
