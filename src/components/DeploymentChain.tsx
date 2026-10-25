import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Tag from './ui/Tag';
import NewWindowHint from './ui/NewWindowHint';
import { site } from '../data';

/**
 * La chaîne de production réelle de ce site, de son dépôt à l'écran du visiteur.
 * Chaque étape (src/content/site.json) est un fait du dépôt et, quand c'est public,
 * un lien vers sa preuve.
 */
const steps = site.chain;

const SIGNAL_START_MS = 700;
const STEP_MS = 380;

const runStyle = {
  '--signal-delay': `${SIGNAL_START_MS}ms`,
  '--signal-duration': `${STEP_MS * (steps.length - 1)}ms`,
} as CSSProperties;

export default function DeploymentChain() {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Le point de signal descend du premier au dernier repère par une translation (composée
  // par le GPU, sans relayout) : la distance dépend du repli du texte, on la mesure et on
  // l'expose en variable CSS sur le rail.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return undefined;
    const update = () => {
      const last = list.lastElementChild;
      if (last instanceof HTMLElement) track.style.setProperty('--chain-dist', `${list.offsetHeight - last.offsetHeight}px`);
    };
    update();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className="rounded-lg border border-line bg-surface p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="min-w-0 text-[15px] font-semibold text-ink">Ce site, du dépôt à votre écran</span>
        <Tag tone="ok" dot className="shrink-0">
          En production
        </Tag>
      </figcaption>

      {/* Le point de signal est hors de la liste : un <ol> n'admet que des <li>. */}
      <div ref={trackRef} className="relative mt-4" style={runStyle}>
        <span aria-hidden="true" className="chain-signal absolute left-[2px] size-[7px] rounded-full bg-accent" />

        <ol ref={listRef} role="list" className="list-none">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="chain-step relative grid grid-cols-[12px_1fr] gap-x-3 py-1.5"
            style={{ '--mark-delay': `${SIGNAL_START_MS + i * STEP_MS}ms` } as CSSProperties}
          >
            <span aria-hidden="true" className="chain-mark mt-[7px] size-[11px] rounded-full border border-line bg-surface" />
            {/* Toujours la même forme : le titre sur une ligne, le détail sur la suivante. */}
            <div className="min-w-0">
              {step.href ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[14px] font-medium leading-[1.4] text-ink hover:text-accent"
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
                <span className="text-[14px] font-medium leading-[1.4] text-ink">{step.title}</span>
              )}
              <div className="font-mono text-[11px] leading-[1.4] text-ink-2 tnum sm:text-[12px]">{step.detail}</div>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </figure>
  );
}
