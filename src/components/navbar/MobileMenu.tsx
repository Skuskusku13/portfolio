import NavLinks from './NavLinks';
import ViewToggle from './ViewToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: 'portfolio' | 'portal';
  onViewChange: (view: 'portfolio' | 'portal') => void;
}

export default function MobileMenu({ isOpen, onClose, currentView, onViewChange }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 absolute w-full left-0 shadow-lg">
      <div className="px-4 py-4 space-y-3">
        {currentView === 'portfolio' && (
          <NavLinks 
            onItemClick={onClose} 
            className="block py-2"
          />
        )}
        <ViewToggle 
          currentView={currentView}
          onViewChange={onViewChange}
          onClick={onClose}
          fullWidth
          className="py-3 mt-2"
          labelPrefix={currentView === 'portfolio' ? 'Accès' : 'Retour'}
        />
      </div>
    </div>
  );
}