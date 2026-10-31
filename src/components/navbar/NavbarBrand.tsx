import { useTheme } from '../../hooks/useThemeContext';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

export default function NavbarBrand() {
  const { theme } = useTheme();

  return (
    <a href="#about" className="flex min-w-0 items-center gap-2.5 rounded-sm" aria-label="Dan Levy, revenir en haut de la page">
      <img src={theme === 'dark' ? logoDark : logoLight} alt="" width={28} height={28} className="size-7" />
      <span className="whitespace-nowrap text-[1rem] font-semibold tracking-[-0.01em] text-ink max-[359px]:sr-only">Dan Levy</span>
    </a>
  );
}
