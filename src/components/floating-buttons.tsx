'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail } from 'lucide-react';
import { ContactDrawer } from '@/components/contact-drawer';
import { SocialDrawer } from '@/components/social-drawer';

export default function FloatingButtons() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [isSocialOpen, setSocialOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
        <Button
          onClick={() => setSocialOpen(true)}
          size="icon"
          className="bg-blue-600 hover:bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir redes sociais"
        >
          <Linkedin size={24} />
        </Button>
        <Button
          onClick={() => setContactOpen(true)}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir formulário de contato"
        >
          <Mail size={24} />
        </Button>
      </div>
      <ContactDrawer isOpen={isContactOpen} onOpenChange={setContactOpen} />
      <SocialDrawer isOpen={isSocialOpen} onOpenChange={setSocialOpen} />
    </>
  );
}
