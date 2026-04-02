import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'pt'}];
}

export const metadata: Metadata = {
    title: 'Rodrigo Alves Ferreira | Web3 Developer & AI Specialist',
    description: 'Interactive portfolio by Rodrigo Alves Ferreira. Explore innovative projects and solutions bridging Law, AI and Blockchain. Web3 Developer, Attorney and purpose-driven technology creator.',
    keywords: ['Web3 Developer', 'AI Specialist', 'Blockchain', 'Attorney', 'Rodrigo Alves Ferreira', 'Portfolio', 'Artificial Intelligence', 'Smart Contracts'],
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
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
