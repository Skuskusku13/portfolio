import { useTheme } from '../../hooks/useTheme';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

interface NavbarBrandProps {
  currentView: 'portfolio' | 'portal';
  onViewChange: (view: 'portfolio' | 'portal') => void;
}

export default function NavbarBrand({ currentView, onViewChange }: NavbarBrandProps) {
  const { theme } = useTheme();

  const handleClick = () => {
    if (currentView !== 'portfolio') {
      onViewChange('portfolio');
    }
  };

  return (
    <a 
      href="#about"
      className="flex items-center gap-2 cursor-pointer" 
      onClick={handleClick}
    >
      <img 
        src={theme === 'dark' ? logoDark : logoLight} 
        alt="Logo" 
        className="h-12 w-auto"
      />
      <span className="font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap">
        Dan Levy
      </span>
    </a>
  );
}