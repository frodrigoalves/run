import Image from 'next/image';
import { LocalizedText } from './localized-text';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <Image
            src="https://placehold.co/100x100.png"
            alt="Rodrigo Alves Ferreira"
            width={100}
            height={100}
            className="rounded-full object-cover border-2 border-primary/50 shadow-lg"
            data-ai-hint="profile picture"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground">Rodrigo Alves Ferreira</h3>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto md:mx-0">
              <LocalizedText
                pt="Este portfólio é um projeto vivo, uma representação dinâmica das minhas habilidades e paixões. É um espaço onde a tecnologia encontra o propósito, e cada linha de código é escrita com a intenção de inovar e resolver problemas."
                en="This portfolio is a living project, a dynamic representation of my skills and passions. It is a space where technology meets purpose, and every line of code is written with the intent to innovate and solve problems."
              />
            </p>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">&copy; 2025 rodrigo.run - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
