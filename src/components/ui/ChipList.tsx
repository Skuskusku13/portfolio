interface ChipListProps {
  items: string[];
  className?: string;
  /** Libellé lu par les lecteurs d'écran, par ex. « Technologies ». */
  label?: string;
}

/**
 * Pastilles de technologies : l'unique forme de puce du site. Sans 13 px, texte à pleine
 * encre, fond canvas sur la carte, filet d'un pixel, coins pleins. Lisibles d'un coup d'œil.
 */
export default function ChipList({ items, className = '', label = 'Technologies' }: ChipListProps) {
  return (
    <ul role="list" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center rounded-full border border-line bg-canvas px-2.5 py-1 text-[13px] leading-[1.3] text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
