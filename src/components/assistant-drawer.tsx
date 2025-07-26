'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/use-localization';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Send, User, Bot } from 'lucide-react';

interface AssistantDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

type Message = {
  role: 'user' | 'model';
  content: { text: string }[];
};

export function AssistantDrawer({ isOpen, onOpenChange }: AssistantDrawerProps) {
  const { t } = useLocalization();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start conversation with a model message
      setIsSending(true);
      fetchAssistantResponse([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A workaround to scroll to the bottom. The viewport is a direct child.
        const viewport = scrollAreaRef.current.children[0];
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);
  

  const fetchAssistantResponse = async (history: Message[]) => {
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from assistant');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'model', content: [{ text: data.response }] }]);

    } catch (error) {
      toast({
        variant: 'destructive',
        title: t({ pt: 'Ocorreu um erro', en: 'An error occurred' }),
        description: t({ pt: 'Não foi possível contatar o assistente. Tente novamente.', en: 'Could not contact the assistant. Please try again.' }),
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isSending) return;

    setIsSending(true);
    const newUserMessage: Message = { role: 'user', content: [{ text: input }] };
    const newHistory = [...messages, newUserMessage];
    setMessages(newHistory);
    setInput('');
    
    await fetchAssistantResponse(newHistory);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="bg-background/95 backdrop-blur-lg text-foreground border-r-border w-full max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-primary">{t({ pt: 'Assistente Pessoal', en: 'Personal Assistant' })}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow my-4" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.role === 'model' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                       <div className={`rounded-lg p-3 max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                           {msg.content[0].text}
                       </div>
                       {msg.role === 'user' && <User className="w-6 h-6 text-foreground flex-shrink-0" />}
                    </div>
                ))}
                 {isSending && messages[messages.length -1]?.role === 'user' && (
                    <div className="flex items-start gap-3 justify-start">
                        <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="bg-muted rounded-lg p-3 max-w-[80%] text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                 )}
            </div>
        </ScrollArea>
        <SheetFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                    name="message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t({ pt: 'Converse comigo...', en: 'Chat with me...' })}
                    required
                    className="flex-grow bg-input border-border placeholder:text-muted-foreground focus:ring-ring"
                    disabled={isSending}
                />
                <Button type="submit" disabled={isSending || !input.trim()} size="icon" className="flex-shrink-0">
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
