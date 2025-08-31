import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
    title: 'Rodrigo Alves Ferreira | Desenvolvedor Web3 & Especialista em IA',
    description: 'Portfólio interativo de Rodrigo Alves Ferreira. Explore projetos e soluções inovadoras que unem Direito, IA e Blockchain. Desenvolvedor Web3, Advogado e criador de tecnologias com propósito.',
    keywords: ['Desenvolvedor Web3', 'Especialista em IA', 'Blockchain', 'Advogado', 'Rodrigo Alves Ferreira', 'Portfólio', 'Inteligência Artificial', 'Smart Contracts'],
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground tracking-wide">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
              {children}
              <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}