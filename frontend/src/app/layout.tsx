import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for the site
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
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
