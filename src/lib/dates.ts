/**
 * Dates et durées affichées. Tout dérive de données existantes : les mois « AAAA-MM » du contenu
 * (src/content/*.json) et l'en-tête Last-Modified de la page servie (la date du build en production).
 */

const YEAR_MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function isYearMonth(value: string): boolean {
  return YEAR_MONTH.test(value);
}

function parseYearMonth(value: string): { year: number; month: number } {
  const match = YEAR_MONTH.exec(value);
  if (!match) throw new RangeError(`Mois attendu au format AAAA-MM, reçu « ${value} »`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

export function toYearMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/** Mois entiers entre deux mois, bornes incluses : janv. 2024 → janv. 2024 vaut 1 mois (convention LinkedIn). */
export function monthsBetween(start: string, end: string): number {
  const from = parseYearMonth(start);
  const to = parseYearMonth(end);
  return (to.year - from.year) * 12 + (to.month - from.month) + 1;
}

/** « 2 ans 9 mois », « 1 an », « 5 mois » ; jamais vide. */
export function formatDuration(months: number): string {
  const safe = Math.max(1, Math.floor(months));
  const years = Math.floor(safe / 12);
  const rest = safe % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} an${years > 1 ? 's' : ''}`);
  if (rest > 0) parts.push(`${rest} mois`);
  return parts.join(' ');
}

/** Durée d'une période ; sans fin, elle court jusqu'au mois de `now`. */
export function periodDuration(start: string, end?: string, now: Date = new Date()): string {
  return formatDuration(monthsBetween(start, end ?? toYearMonth(now)));
}

const BUILD_DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
/** Sans en-tête Last-Modified (serveur de dev), le navigateur renvoie l'instant présent : rien à montrer. */
const FRESH_MS = 60_000;

/**
 * Date du build servi, lue dans `document.lastModified` (en-tête Last-Modified d'index.html,
 * c'est-à-dire la date de construction de l'image en production). Null si le navigateur ne la donne pas.
 */
export function pageBuildDate(doc: Pick<Document, 'lastModified'> = document, now: number = Date.now()): string | null {
  const parsed = new Date(doc.lastModified);
  if (Number.isNaN(parsed.getTime()) || Math.abs(now - parsed.getTime()) < FRESH_MS) return null;
  return BUILD_DATE_FORMAT.format(parsed);
}
