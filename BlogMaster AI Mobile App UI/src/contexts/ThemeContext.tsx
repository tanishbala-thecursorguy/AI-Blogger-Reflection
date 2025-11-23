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
    const initialTheme = (saved as Theme) || 'dark';
    // Apply theme immediately on mount
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-dark', 'theme-bright', 'theme-blue', 'theme-pink', 'theme-stars');
      document.documentElement.classList.add(`theme-${initialTheme}`);
    }
    return initialTheme;
  });

  useEffect(() => {
    // Remove all theme classes
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-dark', 'theme-bright', 'theme-blue', 'theme-pink', 'theme-stars');
      // Add current theme class
      document.documentElement.classList.add(`theme-${theme}`);
      // Also set as attribute for CSS selector specificity
      document.documentElement.setAttribute('data-theme', theme);
      // Save to localStorage
      localStorage.setItem('appTheme', theme);
    }
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
