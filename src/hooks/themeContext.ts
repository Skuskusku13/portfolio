import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/** Contexte du thème : fourni par ThemeProvider (useTheme.tsx), lu par useTheme (useThemeContext.ts). */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
