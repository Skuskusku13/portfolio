import { useSyncExternalStore } from 'react';

const MINUTE_MS = 60_000;
const PARIS_TIME = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });

export function formatParisTime(date: Date): string {
  return PARIS_TIME.format(date);
}

/** Réveille l'abonné au prochain changement de minute, puis chaque minute. */
function subscribe(onChange: () => void): () => void {
  let interval: number | undefined;
  const timeout = window.setTimeout(() => {
    onChange();
    interval = window.setInterval(onChange, MINUTE_MS);
  }, MINUTE_MS - (Date.now() % MINUTE_MS));
  return () => {
    window.clearTimeout(timeout);
    if (interval !== undefined) window.clearInterval(interval);
  };
}

const getSnapshot = (): string => formatParisTime(new Date());
const getServerSnapshot = (): string | null => null;

/**
 * Heure courante à Paris (« 14:32 »), à la minute près. Le lieu vient du JSON-LD d'index.html ;
 * l'heure est la seule donnée vivante de la section Contact, sans rien affirmer d'autre.
 */
export function useParisTime(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
