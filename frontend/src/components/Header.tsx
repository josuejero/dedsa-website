'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './theme/ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'What We Stand For', href: '/what-we-stand-for' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Leadership & Structure', href: '/leadership' },
    { name: 'Committees & Working Groups', href: '/committees' },
    { name: 'Bylaws', href: '/bylaws' },
    { name: 'Contact', href: '/contact' },
    { name: 'UD YDSA', href: '/ud-ydsa' },
  ];

  const isHomePage = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 bg-dsa-red rounded-full flex items-center justify-center transition-all ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              <span className="text-on-accent font-bold">DSA</span>
            </div>
            <span
              className={`text-xl font-bold ${
                isScrolled
                  ? 'text-heading'
                  : isHomePage
                    ? 'text-on-accent'
                    : 'text-heading'
              }`}
            >
              Delaware DSA
            </span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium hover:text-dsa-red hover:no-underline transition-colors ${
                  isScrolled
                    ? 'text-nav'
                    : isHomePage
                      ? 'text-on-accent'
                      : 'text-nav'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/join"
              className={`btn ${
                isScrolled
                  ? 'btn-primary'
                  : isHomePage
                    ? 'bg-white text-dsa-red hover:bg-gray-100'
                    : 'btn-primary'
              }`}
            >
              Join Our Chapter
            </Link>
          </div>

          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                isScrolled
                  ? 'text-heading'
                  : isHomePage
                    ? 'text-on-accent'
                    : 'text-heading'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
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

        {isMenuOpen && (
          <nav className="mt-4 pb-2 md:hidden bg-white rounded-lg shadow-lg">
            <ul className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-2 py-1 text-nav hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  className="block px-2 py-1 mt-2 text-on-accent bg-dsa-red hover:bg-red-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Our Chapter
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
