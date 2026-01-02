import { menuItems } from './items';

interface NavLinksProps {
  onItemClick?: () => void;
  className?: string;
}

export default function NavLinks({ onItemClick, className = "" }: NavLinksProps) {
  return (
    <>
      {menuItems.map((item) => (
        <a 
          key={item.href}
          href={item.href} 
          onClick={onItemClick}
          className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap ${className}`}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}