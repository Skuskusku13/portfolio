import { menuItems } from './items';

interface NavLinksProps {
  activeId?: string | null;
  onItemClick?: () => void;
  variant?: 'desktop' | 'mobile';
}

export default function NavLinks({ activeId = null, onItemClick, variant = 'desktop' }: NavLinksProps) {
  return (
    <>
      {menuItems.map((item) => {
        const isActive = activeId === item.href.slice(1);
        const shared = 'transition-colors duration-200';
        const desktop = `relative py-1 text-[14px] ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'} after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ink after:origin-left after:transition-transform after:duration-300 after:ease-out-quint ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`;
        const mobile = `block py-3 text-[20px] font-medium ${isActive ? 'text-ink' : 'text-ink-2'}`;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            aria-current={isActive ? 'true' : undefined}
            className={`${shared} ${variant === 'desktop' ? desktop : mobile}`}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}
