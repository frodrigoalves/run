import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import LanguageAndThemeSwitcher from "@/components/LanguageAndThemeSwitcher";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Rodrigo Alves Ferreira | Desenvolvedor Web3 & Especialista em IA",
  description: "Portfólio interativo de Rodrigo Alves Ferreira. Explore projetos e soluções inovadoras que unem Direito, IA e Blockchain. Desenvolvedor Web3, Advogado e criador de tecnologias com propósito.",
  keywords: "Desenvolvedor Web3,Especialista em IA,Blockchain,Advogado,Rodrigo Alves Ferreira,Portfólio,Inteligência Artificial,Smart Contracts",
};

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />
      </head>
      <body className="font-body antialiased bg-background text-foreground tracking-wide">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageAndThemeSwitcher />
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
