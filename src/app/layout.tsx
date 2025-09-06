import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Rodrigo Alves Ferreira | Desenvolvedor Web3 & Especialista em IA',
    description: 'Portfólio interativo de Rodrigo Alves Ferreira. Explore projetos e soluções inovadoras que unem Direito, IA e Blockchain. Desenvolvedor Web3, Advogado e criador de tecnologias com propósito.',
    keywords: ['Desenvolvedor Web3', 'Especialista em IA', 'Blockchain', 'Advogado', 'Rodrigo Alves Ferreira', 'Portfólio', 'Inteligência Artificial', 'Smart Contracts'],
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is required by Next.js, but since we have a
  // `[locale]` layout, we can just render the children here.
  return children;
}
