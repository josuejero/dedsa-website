import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Footer from '../core/components/layout/Footer';
import Header from '../core/components/layout/Header';
import { ThemeProvider } from '../components/theme/ThemeProvider';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Delaware DSA',
    default: 'Delaware DSA | Democratic Socialists of America',
  },
  description:
    'The Delaware chapter of the Democratic Socialists of America (DSA). Member-run, progressive activism since 2021.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <ThemeProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
