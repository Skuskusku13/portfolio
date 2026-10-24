import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

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
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

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
 */
/** Retire les props communes avant de transmettre le reste à l'élément natif. */
function omitCommon(props: ButtonProps): Record<string, unknown> {
  const rest: Record<string, unknown> = { ...props };
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;
  return rest;
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const rest = omitCommon(props);

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
