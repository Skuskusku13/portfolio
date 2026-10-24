import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from './themeContext';

/** Accès au thème courant et à sa bascule ; exige un ThemeProvider au-dessus. */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
