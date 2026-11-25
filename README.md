# Portfolio - Dan Levy

Portfolio professionnel de Dan Levy, Développeur Back-end & DevOps : parcours, compétences,
projets réalisés en entreprise et en formation, formulaire de contact. Page unique, servie en
statique, sans suivi ni cookie.

## Stack

| Couche | Outil |
|---|---|
| Interface | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict) |
| Build | [Vite 8](https://vite.dev/) (Rolldown), un seul chunk JS |
| Styles | [Tailwind CSS v4](https://tailwindcss.com/), tokens dans `src/index.css`, thème clair / sombre |
| Icônes | [Lucide React](https://lucide.dev/) |
| Tests | [Vitest 5](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) sous jsdom, couverture V8 |
| Qualité | ESLint 10 (flat config, typescript-eslint, react-hooks, react-refresh) |
| Service | Apache `httpd:2.4-alpine` dans une image Docker multi-stage, derrière nginx-proxy et Cloudflare |

Node 26 (`.nvmrc`, `engines.node >= 26`), npm.

## Installation et lancement

```bash
git clone https://github.com/Skuskusku13/portfolio.git
cd portfolio
nvm use                                   # Node 26
npm ci
echo 'VITE_MAILER_URL=https://...' > .env  # optionnel en local, voir plus bas
npm run dev
```

Le serveur de développement est accessible sur `http://localhost:5173`.

## Scripts

<!-- AUTO-GENERATED: package.json scripts -->
| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement Vite avec rechargement à chaud |
| `npm run build` | Vérification des types (`tsc -b`) puis build de production dans `dist/` |
| `npm run preview` | Sert `dist/` en local (base des mesures Lighthouse) |
| `npm run lint` | ESLint sur tout le dépôt |
| `npm run typecheck` | Vérification des types seule (`tsc -b`) |
| `npm test` | Suite de tests Vitest, une passe |
| `npm run test:watch` | Tests en mode surveillance |
| `npm run test:coverage` | Tests avec rapport de couverture et seuils (80 %) |
<!-- /AUTO-GENERATED -->

## Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `VITE_MAILER_URL` | non (prod : oui) | URL `https://` de l'API de contact. Absente ou invalide : le formulaire est remplacé par l'adresse email. Inlinée au build, donc publique. |

Toute variable `VITE_*` finit dans le bundle livré au navigateur : aucun secret ne doit y
transiter. Le Dockerfile refuse un build sans URL `https://`.

## Architecture

- `src/content/` : le contenu du site (expériences, formations, projets, compétences,
  chaîne de production) en JSON, validé au chargement par `src/content/schema.ts`. C'est ici
  qu'on modifie un texte.
- `src/components/` : un composant par section, primitives dans `ui/`, navigation dans `navbar/`.
- `src/hooks/` : thème, section active, nombre d'éléments par page.
- `src/lib/contact.ts` : validation, envoi et erreurs typées du formulaire, sans React.
- `src/types/` : contrats TypeScript du contenu.
- `tests/` : garde-fous hors application (hash CSP, origine de l'API).

Détails dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) ; stratégie de test dans
[docs/TESTING.md](docs/TESTING.md).

## Fonctionnalités

- Navigation par ancres avec section active, menu mobile accessible au clavier.
- Projets filtrables par catégorie (pro, perso, formation) et paginés ; compétences paginées.
- Formulaire de contact validé en direct, compteur de caractères, panneau de succès, erreurs
  d'envoi explicites, repli email ; copie de l'adresse, LinkedIn et GitHub sous le formulaire.
- Durée de chaque expérience calculée depuis le contenu.
- Thème clair / sombre sans flash (script inline hashé en CSP), suivi du système.
- Hero peint avant le JavaScript, animations d'entrée désactivées sous `prefers-reduced-motion`.
- Polices auto-hébergées, Open Graph, JSON-LD, sitemap, page 404.

## Tests

```bash
npm test                 # 177 tests
npm run test:coverage    # seuils 80 % sur src/hooks, src/components, src/lib, src/content, src/config.ts
```

Les tests vivent à côté des sources (`*.test.tsx`), interrogent le DOM par rôle et nom
accessible, et couvrent le formulaire de contact (succès, erreur réseau, délai, validation).

## Mesures (octobre 2026, `npm run preview`, Lighthouse 12)

| | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Mobile | 98 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

JavaScript initial : 87 ko gzip. Couverture de tests : 98 % des instructions.
Aucune erreur ni avertissement console, aucune requête en échec.

## CSP et script inline

Apache (`.docker/000-default.conf`) sert une Content-Security-Policy avec `script-src 'self'`
plus le hash sha256 du seul script inline de `index.html`, celui qui pose le thème avant le
premier rendu. Le bloc JSON-LD est un bloc de données, il n'a pas besoin de hash.

`tests/csp.test.ts` recalcule le hash à chaque `npm test` : si le script change sans la CSP,
la suite échoue avec le nouveau hash à reporter dans la configuration.

## Versions et releases

Les versions sont gérées par [release-please](https://github.com/googleapis/release-please-action)
(`.github/workflows/release-please.yml`). À chaque push sur `main`, il ouvre ou met à jour une PR
« chore(main): release X.Y.Z » à partir des commits conventionnels (`feat`, `fix`, `perf`) :
CHANGELOG.md et version de `package.json`. Rien n'est publié tant que cette PR n'est pas mergée.
Au merge, le tag `vX.Y.Z` et la Release GitHub sont créés.

## Déploiement

À chaque release (merge de la PR release-please), `.github/workflows/image.yml` construit l'image,
la scanne avec Trivy et la publie sur `ghcr.io/skuskusku13/portfolio` (tags `X.Y.Z`, `X.Y`, `latest`,
`sha-…`) avec une attestation de provenance signée par GitHub. Le paquet est privé : le serveur
doit être connecté au registre (`docker login ghcr.io`, jeton en lecture seule sur les paquets)
avant de tirer l'image.

Le workflow signale ensuite la version au dépôt privé `homelab-deploy`, dont le runner
self-hosted sur le serveur tire l'image et relance le conteneur. Déploiement à la main ou
retour arrière : workflow « Deploy » de `homelab-deploy`, service `portfolio`, tag voulu.

Sur le serveur, en secours (registre déjà connecté) :

```bash
PORTFOLIO_TAG=1.0.0 make deploy   # pull de l'image GHCR puis up -d (latest si PORTFOLIO_TAG absent)
```

Build local de secours, sans passer par GHCR :

```bash
make build   # image multi-stage node:26-alpine → httpd:2.4-alpine (digests épinglés)
make up      # compose derrière le réseau nginx-proxy
```

Retour arrière : `PORTFOLIO_TAG=<version précédente> make deploy`. Le site est statique, il n'y a
aucune donnée à migrer.

---
© 2026 Dan Levy
