import { useTheme } from '../../hooks/useThemeContext';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

export default function NavbarBrand() {
  const { theme } = useTheme();

  return (
    <a href="#about" className="flex items-center gap-2.5 rounded-sm" aria-label="Dan Levy, revenir en haut de la page">
      <img src={theme === 'dark' ? logoDark : logoLight} alt="" width={28} height={28} className="size-7" />
      <span className="text-[16px] font-semibold tracking-[-0.01em] text-ink">Dan Levy</span>
    </a>
  );
}
