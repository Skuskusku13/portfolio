import { menuItems } from './items';

interface NavLinksProps {
  activeId?: string | null;
  onItemClick?: () => void;
  variant?: 'desktop' | 'mobile';
}

const DESKTOP_UNDERLINE =
  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ink after:origin-left after:transition-transform after:duration-300 after:ease-out-quint';

/**
 * Liens de section. Sur desktop, la section active est soulignée ; sur mobile, elle porte
 * un filet gauche en encre, pour ne jamais reposer sur la seule couleur (WCAG 1.4.1).
 */
export default function NavLinks({ activeId = null, onItemClick, variant = 'desktop' }: NavLinksProps) {
  return (
    <>
      {menuItems.map((item) => {
        const isActive = activeId === item.href.slice(1);
        const desktop = `relative py-1 text-[0.875rem] ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'} ${DESKTOP_UNDERLINE} ${
          isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
        }`;
        const mobile = `block border-l py-3 pl-4 text-[1.25rem] font-medium ${
          isActive ? 'border-ink text-ink' : 'border-transparent text-ink-2'
        }`;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            aria-current={isActive ? 'location' : undefined}
            className={`transition-colors duration-200 ${variant === 'desktop' ? desktop : mobile}`}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}
