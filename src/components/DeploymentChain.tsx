import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Tag from './ui/Tag';
import NewWindowHint from './ui/NewWindowHint';

const REPO = 'https://github.com/Skuskusku13/portfolio';

/**
 * La chaîne de production réelle de ce site, de son dépôt à l'écran du visiteur.
 * Chaque étape est un fait du dépôt et, quand c'est public, un lien vers sa preuve.
 */
const steps: { title: string; detail: string; href?: string }[] = [
  { title: 'Code', detail: 'React 19 · TypeScript · Vite · Tailwind CSS', href: REPO },
  { title: 'CI sécurité', detail: 'Actions : Trivy · Gitleaks · ZAP', href: `${REPO}/tree/main/.github/workflows` },
  { title: 'Build', detail: 'Docker multi-stage : node:26 → httpd:2.4', href: `${REPO}/blob/main/.docker/Dockerfile` },
  { title: 'Serveur', detail: 'Apache durci : CSP, COOP / COEP, nosniff', href: `${REPO}/blob/main/.docker/000-default.conf` },
  { title: 'Réseau', detail: 'Réseau privé · reverse proxy · Cloudflare Tunnel · TLS' },
  { title: 'dlyhub.com', detail: 'Cette page, servie en production', href: 'https://dlyhub.com/' },
];

const SIGNAL_START_MS = 700;
const STEP_MS = 380;

const runStyle = {
  '--signal-delay': `${SIGNAL_START_MS}ms`,
  '--signal-duration': `${STEP_MS * (steps.length - 1)}ms`,
} as CSSProperties;

export default function DeploymentChain() {
  const listRef = useRef<HTMLOListElement>(null);

  // Le point de signal s'arrête sur le dernier repère : on mesure la hauteur de la
  // dernière étape (elle varie avec le repli du texte) et on l'expose en variable CSS.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const last = list.lastElementChild as HTMLElement | null;
      if (last) list.style.setProperty('--chain-last-h', `${last.offsetHeight}px`);
    };
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="min-w-0 text-[15px] font-semibold text-ink">Ce site, du dépôt à votre écran</span>
        <Tag tone="ok" dot className="shrink-0">
          En production
        </Tag>
      </figcaption>

      {/* Le point de signal est hors de la liste : un <ol> n'admet que des <li>. */}
      <div className="relative mt-5" style={runStyle}>
        <span aria-hidden="true" className="chain-signal absolute left-[2px] size-[7px] rounded-full bg-accent" />

        <ol ref={listRef} role="list" className="list-none">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="chain-step relative grid grid-cols-[12px_1fr] gap-x-4 py-2.5"
            style={{ '--mark-delay': `${SIGNAL_START_MS + i * STEP_MS}ms` } as CSSProperties}
          >
            <span aria-hidden="true" className="chain-mark mt-[7px] size-[11px] rounded-full border border-line bg-surface" />
            <div className="min-w-0">
              {step.href ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 py-0.5 text-[15px] font-medium leading-[1.4] text-ink hover:text-accent"
                >
                  {step.title}
                  <NewWindowHint />
                  <ArrowUpRight
                    className="size-3.5 text-ink-3 transition-[color,transform] duration-200 ease-out-quint group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <div className="text-[15px] font-medium leading-[1.4] text-ink">{step.title}</div>
              )}
              <div className="mt-0.5 font-mono text-[12px] leading-[1.5] text-ink-2 tnum">{step.detail}</div>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </figure>
  );
}
