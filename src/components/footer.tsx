import Image from 'next/image';
import { LocalizedText } from './localized-text';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <Image
            src="https://placehold.co/80x80.png"
            alt="Rodrigo"
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-primary/50 shadow-lg"
            data-ai-hint="profile picture"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground">Rodrigo</h3>
            <p className="mt-1 text-muted-foreground max-w-lg mx-auto md:mx-0 text-sm">
              <LocalizedText
                pt="Este portfólio é um projeto vivo, uma representação dinâmica das minhas habilidades e paixões. É um espaço onde a tecnologia encontra o propósito, e cada linha de código é escrita com a intenção de inovar e resolver problemas."
                en="This portfolio is a living project, a dynamic representation of my skills and passions. It is a space where technology meets purpose, and every line of code is written with the intent to innovate and solve problems."
              />
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
