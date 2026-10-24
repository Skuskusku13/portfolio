import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import NewWindowHint from './NewWindowHint';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export type ButtonProps = AnchorProps | NativeButtonProps;

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap select-none ' +
  'transition-[background-color,color,border-color,transform] duration-200 ease-out-quint ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-50 ' +
  'aria-disabled:pointer-events-none aria-disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-hover',
  secondary: 'bg-surface text-ink border border-line hover:border-line-strong',
  ghost: 'text-ink-2 hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[14px]',
  md: 'h-11 px-5 text-[15px]',
};

/**
 * Un seul composant d'action pour tout le site. `href` rend un lien, sinon un bouton.
 * Trois variantes : primary (une par écran), secondary (filet), ghost (texte).
 * Un lien ouvert dans un nouvel onglet l'annonce aux lecteurs d'écran ; un bouton
 * `aria-disabled` reste focalisable (le focus clavier n'est jamais perdu).
 */
export default function Button(props: ButtonProps) {
  const classes = `${base} ${variants[props.variant ?? 'primary']} ${sizes[props.size ?? 'md']} ${props.className ?? ''}`;

  if (props.href !== undefined) {
    const { variant, size, className, children, ...anchorProps } = props;
    return (
      <a className={classes} {...anchorProps}>
        {children}
        {anchorProps.target === '_blank' && <NewWindowHint />}
      </a>
    );
  }

  const { variant, size, className, children, type = 'button', ...buttonProps } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
