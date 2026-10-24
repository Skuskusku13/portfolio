# Stratégie de test

Décidée le 24 octobre 2026 (TICKET-11 du backlog). Elle couvre une SPA React mono-page
sans backend : tout se teste en unitaire et en composant, sous jsdom, sans navigateur.

## Outils

| Rôle | Outil | Pourquoi |
|---|---|---|
| Lanceur | Vitest 5 (`vitest.config.ts` fusionne `vite.config.ts`) | même pipeline que le build (plugin React, Tailwind), aucune configuration Babel/Jest parallèle |
| DOM | jsdom 30 | plus fidèle que happy-dom sur les formulaires, le focus et la validation HTML5 |
| Rendu et requêtes | @testing-library/react 16 + dom 10 | requêtes par rôle et nom accessible : les tests vérifient ce qu'un lecteur d'écran expose |
| Interactions | @testing-library/user-event 14 | clavier et pointeur réalistes (Tab, Échap, clic) |
| Assertions DOM | @testing-library/jest-dom 7 | `toBeInTheDocument`, `toHaveAccessibleName`, `toHaveFocus` |
| Couverture | @vitest/coverage-v8 | seuils 80 % sur `src/hooks` et `src/components` (`npm run test:coverage`) |

Toutes ces dépendances sont en `devDependencies` : aucun impact sur le bundle servi.

## Scripts

```bash
npm test               # une passe (CI)
npm run test:watch     # développement
npm run test:coverage  # rapport texte + HTML dans coverage/
```

## Organisation

- Un fichier `X.test.tsx` à côté de chaque source `X.tsx` ; les hooks en `X.test.ts(x)`.
- `src/test/setup.ts` : jest-dom, stub de `window.matchMedia` (lu par le thème), stub de
  `Element.prototype.scrollIntoView` (pagination), nettoyage du DOM, des classes de thème
  et du `localStorage` après chaque test.
- `src/test/fakeIntersectionObserver.ts` : faux `IntersectionObserver` à installer
  localement quand un test doit déclencher une entrée (`Reveal`, `useActiveSection`).
  Sans lui, jsdom n'a pas l'API et le code rend tout visible d'emblée, ce qui est le
  comportement voulu hors test.
- Les APIs à simuler au cas par cas : `fetch` (formulaire), `navigator.clipboard`,
  `ResizeObserver`, `window.innerWidth` + événement `resize` (pagination responsive).
- Pas de globals Vitest : `describe`, `it`, `expect`, `vi` sont importés explicitement.

## Ce que l'on teste, et comment

| Zone | Approche |
|---|---|
| Hooks (`useTheme`, `useActiveSection`, `useItemsPerPage`) | `renderHook`, `act`, mocks des APIs navigateur |
| Primitives `ui/` | rendu, attributs accessibles, variantes de classes |
| Sections (Expériences, Projets, Compétences, Formation, Hero, Chaîne) | rendu depuis les vraies données de `src/data`, filtres, pagination, noms accessibles |
| Navigation | ouverture/fermeture du menu, focus, Échap, clic extérieur, passage en desktop |
| Formulaire de contact | validation en direct, succès, erreur réseau, délai dépassé, `fetch` simulé (jamais d'appel réel) |
| `index.html` | cohérence des hashes CSP des scripts inline avec `.docker/000-default.conf` |

Règles : nommer les tests par le comportement (« ferme le menu avec Échap »), structure
Arrange / Act / Assert, requêtes par rôle avant tout, pas de snapshot, pas d'assertion
sur l'état interne d'un composant.

## Ce que l'on ne teste pas ici

- Le rendu visuel (couleurs, mise en page) : captures Chrome headless à 390 / 768 / 1280 /
  1920 px et Lighthouse lors des revues, hors suite automatisée.
- Le serveur de mail (`VITE_MAILER_URL`) : hors dépôt, contrat `POST { from, subject, html }`.
- La configuration Apache et Docker : `httpd -t` et lecture, pas de daemon Docker en local.

## Intégration continue

`.github/workflows/ci.yml` lance `npm run lint`, `npm run typecheck`, `npm test` et
`npm run build` sur chaque pull request et chaque push sur `main` (TICKET-17).
