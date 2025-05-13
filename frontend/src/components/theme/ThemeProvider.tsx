'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'rebel';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Check for system preference on first load
  useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    if (storedTheme === 'dark' || storedTheme === 'rebel') {
      setTheme(storedTheme);
      document.documentElement.classList.add('dark-mode');
      if (storedTheme === 'rebel') {
        document.documentElement.classList.add('rebel-mode');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark-mode', 'rebel-mode');
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('rebel-mode');
    } else if (theme === 'rebel') {
      document.documentElement.classList.add('dark-mode', 'rebel-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
