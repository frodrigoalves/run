'use client';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16 py-8 bg-background/50">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="https://placehold.co/80x80.png"
            alt="Rodrigo"
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-primary/50 shadow-lg"
            data-ai-hint="profile picture"
          />
          <div>
            <h3 className="text-lg font-bold text-foreground">Rodrigo</h3>
            <p className="mt-1 text-muted-foreground text-sm">
              Esforço é o nome do meu talento.
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">&copy; {currentYear} rodrigo.run - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
