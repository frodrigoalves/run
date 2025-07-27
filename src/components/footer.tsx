import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <Image
            src="https://placehold.co/80x80.png"
            alt="Rodrigo"
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-primary/50 shadow-lg"
            data-ai-hint="profile picture"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">Rodrigo</h3>
            <p className="mt-1 text-muted-foreground max-w-lg mx-auto md:mx-0 text-sm italic">
              "Esforço é o nome do meu talento."
            </p>
          </div>
        </div>
        <div className="text-center mt-10 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground">&copy; 2025 rodrigo.run - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
