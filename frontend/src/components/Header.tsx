'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import hJson from '../content/components/header.json';

type NavItem = { name: string; href: string };
interface HeaderData {
  siteName: string;
  joinButtonText: string;
  navItems: NavItem[];
}
const h = hJson as HeaderData;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Throttle updates for better performance
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Memoize class names
  const headerClass = useMemo(
    () =>
      `fixed w-full z-50 transition ${
        scrolled
          ? 'bg-white bg-opacity-95 shadow-md py-2'
          : 'bg-transparent py-4'
      }`,
    [scrolled]
  );

  const isSolid = scrolled || !isHome;
  const logoScale = scrolled ? 'scale-90' : 'scale-100';
  const textColor = isSolid ? 'text-heading' : 'text-on-accent';

  const linkClass = useMemo(
    () =>
      `font-medium transition hover:text-dsa-red ${
        isSolid ? 'text-nav' : 'text-on-accent'
      }`,
    [isSolid]
  );

  const joinBtnClass = isSolid
    ? 'btn btn-primary'
    : isHome
      ? 'btn bg-white text-dsa-red'
      : 'btn btn-primary';

  return (
    <header className={headerClass}>
      <div className="container-page flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/dedsa-logo.png"
            alt="Logo"
            width={40}
            height={40}
            className={`transition ${logoScale}`}
            priority
          />
          <span className={`text-xl font-bold ${textColor}`}>{h.siteName}</span>
        </Link>
        <nav className="hidden md:flex space-x-6" role="navigation">
          {h.navItems.map(({ name, href }) => (
            <Link key={name} href={href} className={linkClass}>
              {name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Link href="/join" className={joinBtnClass}>
            {h.joinButtonText}
          </Link>
        </div>
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          <svg
            className={`h-6 w-6 ${textColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
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
      {menuOpen && (
        <nav
          className="md:hidden bg-white shadow-lg rounded-lg p-4 mt-4"
          role="navigation"
        >
          {h.navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="block px-2 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Link
            href="/join"
            className="block mt-2 px-2 py-1 bg-dsa-red text-white"
            onClick={() => setMenuOpen(false)}
          >
            {h.joinButtonText}
          </Link>
        </nav>
      )}
    </header>
  );
}
