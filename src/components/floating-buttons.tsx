'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Contact, Lightbulb } from 'lucide-react';
import { SocialDrawer } from '@/components/social-drawer';
import { IdeaDrawer } from '@/components/idea-drawer';

export default function FloatingButtons() {
  const [isSocialOpen, setSocialOpen] = useState(false);
  const [isIdeaDrawerOpen, setIdeaDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
        <Button
          onClick={() => setIdeaDrawerOpen(true)}
          size="icon"
          className="bg-primary/80 hover:bg-primary text-primary-foreground w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir mural de ideias"
        >
          <Lightbulb size={24} strokeWidth={1.5} />
        </Button>
        <Button
          onClick={() => setSocialOpen(true)}
          size="icon"
          className="bg-secondary hover:bg-accent text-white w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir redes sociais"
        >
          <Contact size={24} strokeWidth={1.5} />
        </Button>
      </div>
      <SocialDrawer isOpen={isSocialOpen} onOpenChange={setSocialOpen} />
      <IdeaDrawer isOpen={isIdeaDrawerOpen} onOpenChange={setIdeaDrawerOpen} />
    </>
  );
}
