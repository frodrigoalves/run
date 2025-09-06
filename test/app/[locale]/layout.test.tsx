import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/[locale]/layout';

// Mocking dependencies
jest.mock('next-intl/server', () => ({
  unstable_setRequestLocale: jest.fn(),
  getMessages: jest.fn().mockResolvedValue({ "test": "test" }),
}));

jest.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster-mock" />,
}));

jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider-mock">{children}</div>
  ),
}));

// We don't need to mock NextIntlClientProvider if we just want to see if it renders its children
// But it's cleaner to mock it.
jest.mock('next-intl', () => {
    const originalModule = jest.requireActual('next-intl');
    return {
        ...originalModule,
        NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="next-intl-provider-mock">{children}</div>
          ),
    };
});

describe('RootLayout', () => {
  const locale = 'en';
  const children = <div>Test Children</div>;

  it('sets the html lang attribute to the current locale', async () => {
    const ResolvedLayout = await RootLayout({ children, params: { locale } });
    const { container } = render(ResolvedLayout);
    expect(container.querySelector('html')?.getAttribute('lang')).toBe(locale);
  });

  it('renders the children', async () => {
    const ResolvedLayout = await RootLayout({ children, params: { locale } });
    render(ResolvedLayout);
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('renders the ThemeProvider', async () => {
    const ResolvedLayout = await RootLayout({ children, params: { locale } });
    render(ResolvedLayout);
    expect(screen.getByTestId('theme-provider-mock')).toBeInTheDocument();
  });

  it('renders the Toaster', async () => {
    const ResolvedLayout = await RootLayout({ children, params: { locale } });
    render(ResolvedLayout);
    expect(screen.getByTestId('toaster-mock')).toBeInTheDocument();
  });
  
  it('renders the NextIntlClientProvider', async () => {
    const ResolvedLayout = await RootLayout({ children, params: { locale } });
    render(ResolvedLayout);
    expect(screen.getByTestId('next-intl-provider-mock')).toBeInTheDocument();
  });

  it('calls unstable_setRequestLocale with the correct locale', async () => {
    const { unstable_setRequestLocale } = require('next-intl/server');
    const ResolvedLayout = await RootLayout({ children, params: { locale } });
    render(ResolvedLayout);
    expect(unstable_setRequestLocale).toHaveBeenCalledWith(locale);
  });
});