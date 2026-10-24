import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  /** Décalage d'entrée en ms (orchestration par section : 0, 60, 120…). */
  delay?: number;
  className?: string;
  id?: string;
  /** Rôle ARIA explicite (ex. `list` sur un ul sans puces, que Safari ne considère plus comme une liste). */
  role?: string;
  children: ReactNode;
}

/**
 * Entrée unique du site : opacité + 8 px, 480 ms, ease-out-quint, déclenchée à
 * l'arrivée dans le viewport. Sans JS ou sous prefers-reduced-motion, le contenu
 * est visible d'emblée (voir .reveal dans index.css).
 *
 * L'état « visible » est un état React (pas une classe posée à la main sur le DOM) :
 * une réécriture de `className` par React ne peut donc jamais le faire disparaître.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', id, role, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Sans IntersectionObserver (vieux navigateur), visible d'emblée.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} id={id} role={role} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
