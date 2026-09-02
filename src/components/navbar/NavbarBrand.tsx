import { useTheme } from '../../hooks/useTheme';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

export default function NavbarBrand() {
  const { theme } = useTheme();

  return (
    <a
      href="#about"
      className="flex items-center gap-2 cursor-pointer"
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