import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'dark' | 'bright' | 'blue' | 'pink' | 'stars';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('appTheme');
    return (saved as Theme) || 'dark';
  });

  // Initialize theme on mount
  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-dark', 'theme-bright', 'theme-blue', 'theme-pink', 'theme-stars');
    // Add current theme class
    const initialTheme = (localStorage.getItem('appTheme') as Theme) || 'dark';
    document.documentElement.classList.add(`theme-${initialTheme}`);
    if (initialTheme !== theme) {
      setThemeState(initialTheme);
    }
  }, []);

  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-dark', 'theme-bright', 'theme-blue', 'theme-pink', 'theme-stars');
    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`);
    // Save to localStorage
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

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
