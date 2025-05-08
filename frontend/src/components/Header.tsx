'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation menu items based on the outline
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'What We Stand For', href: '/what-we-stand-for' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Leadership & Structure', href: '/leadership' },
    { name: 'Committees & Working Groups', href: '/committees' },
    { name: 'Bylaws', href: '/bylaws' },
    { name: 'Contact', href: '/contact' },
    { name: 'UD YDSA', href: '/ud-ydsa' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container-page py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Title */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              {/* Replace with actual logo when available */}
              <div className="w-10 h-10 bg-dsa-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DSA</span>
              </div>
              <span className="text-xl font-bold">Delaware DSA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-dsa-red hover:no-underline font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Join Button */}
          <div className="hidden md:block">
            <Link href="/join" className="btn btn-primary">
              Join Our Chapter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-2 md:hidden">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  className="block px-2 py-1 mt-2 text-white bg-dsa-red hover:bg-red-700 rounded"
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
