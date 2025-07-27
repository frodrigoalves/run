'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Contact, Lightbulb } from 'lucide-react';
import { SocialDrawer } from '@/components/social-drawer';

export default function FloatingButtons() {
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
      </div>
      <SocialDrawer isOpen={isSocialOpen} onOpenChange={setSocialOpen} />
    </>
  );
}
