import { LayoutDashboard, Briefcase } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'portfolio' | 'portal';
  onViewChange: (view: 'portfolio' | 'portal') => void;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  labelPrefix?: string;
}

export default function ViewToggle({ 
  currentView, 
  onViewChange, 
  className = "", 
  onClick,
  fullWidth = false,
  labelPrefix = ""
}: ViewToggleProps) {
  
  const handleClick = () => {
    onViewChange(currentView === 'portfolio' ? 'portal' : 'portfolio');
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors text-sm font-medium whitespace-nowrap ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {currentView === 'portfolio' ? (
        <>
          <LayoutDashboard className="w-4 h-4" />
          {labelPrefix ? `${labelPrefix} Portail` : 'Portail'}
        </>
      ) : (
        <>
          <Briefcase className="w-4 h-4" />
          {labelPrefix ? `${labelPrefix} Portfolio` : 'Portfolio'}
        </>
      )}
    </button>
  );
}