'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import hJson from '../content/components/header.json';

const h = hJson as {
  siteName: string;
  joinButtonText: string;
  navItems: { name: string; href: string }[];
};

export default function Header() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  const p = usePathname();
  useEffect(() => {
    const f = () => setSc(window.scrollY > 50);
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);
  const home = p === '/';
  return (
    <header
      className={`fixed w-full z-50 transition ${sc ? 'bg-white bg-opacity-95 shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container-page flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/dedsa-logo.png"
            alt="Logo"
            width={40}
            height={40}
            className={`transition ${sc ? 'scale-90' : 'scale-100'}`}
          />
          <span
            className={`text-xl font-bold ${sc ? 'text-heading' : home ? 'text-on-accent' : 'text-heading'}`}
          >
            {h.siteName}
          </span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          {h.navItems.map((i) => (
            <Link
              key={i.name}
              href={i.href}
              className={`font-medium hover:text-dsa-red transition ${sc ? 'text-nav' : home ? 'text-on-accent' : 'text-nav'}`}
            >
              {i.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Link
            href="/join"
            className={`btn ${sc ? 'btn-primary' : home ? 'bg-white text-dsa-red' : 'btn-primary'}`}
          >
            {h.joinButtonText}
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg
            className={`h-6 w-6 ${sc ? 'text-heading' : home ? 'text-on-accent' : 'text-heading'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden bg-white shadow-lg rounded-lg p-4 mt-4">
          {h.navItems.map((i) => (
            <Link
              key={i.name}
              href={i.href}
              className="block px-2 py-1"
              onClick={() => setOpen(false)}
            >
              {i.name}
            </Link>
          ))}
          <Link
            href="/join"
            className="block mt-2 px-2 py-1 bg-dsa-red text-white"
            onClick={() => setOpen(false)}
          >
            {h.joinButtonText}
          </Link>
        </nav>
      )}
    </header>
  );
}
