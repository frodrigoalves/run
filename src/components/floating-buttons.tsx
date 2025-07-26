'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Contact, Lightbulb } from 'lucide-react';
import { IdeaDrawer } from '@/components/idea-drawer';
import { SocialDrawer } from '@/components/social-drawer';

export default function FloatingButtons() {
  const [isIdeaOpen, setIdeaOpen] = useState(false);
  const [isSocialOpen, setSocialOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
        <Button
          onClick={() => setSocialOpen(true)}
          size="icon"
          className="bg-secondary hover:bg-accent text-white w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir redes sociais"
        >
          <Contact size={24} strokeWidth={1.5} />
        </Button>
        <Button
          onClick={() => setIdeaOpen(true)}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir mural de ideias"
        >
          <Lightbulb size={24} strokeWidth={1.5} />
        </Button>
      </div>
      <IdeaDrawer isOpen={isIdeaOpen} onOpenChange={setIdeaOpen} />
      <SocialDrawer isOpen={isSocialOpen} onOpenChange={setSocialOpen} />
    </>
  );
}
