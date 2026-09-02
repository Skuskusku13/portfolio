import NavLinks from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 absolute w-full left-0 shadow-lg">
      <div className="px-4 py-4 space-y-3">
        <NavLinks
          onItemClick={onClose}
          className="block py-2"
        />
      </div>
    </div>
  );
}