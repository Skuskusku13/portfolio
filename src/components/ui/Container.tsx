import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Largeur de lecture commune à toutes les sections : 1200 px max, gouttières 20 / 32 / 48 px. */
export default function Container({ as: Tag = 'div', className = '', children }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</Tag>;
}
