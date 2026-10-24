# Architecture du portfolio

Page unique React servie en statique. Ce document décrit le code tel qu'il est sur la
branche `hero-fix` (octobre 2026) ; le design est documenté dans `DESIGN.md` et le dossier
de refonte dans `REFONTE.md`.

## Vue d'ensemble

```text
index.html                 métas, Open Graph, JSON-LD, script de thème inline (hashé en CSP),
                           hero statique dans #root (peint avant le JavaScript), feuille de style
src/
├── main.tsx               createRoot → StrictMode → ThemeProvider → App
├── App.tsx                lien d'évitement, Navbar, main (sections), Footer
├── index.css              tokens clair / sombre (@theme inline), polices, grammaire de mouvement
├── config.ts              VITE_MAILER_URL validée (https ; null → repli email), EMAIL, GITHUB_URL, LINKEDIN_URL
├── content/               CONTENU ÉDITABLE : experiences.json, formations.json, projects.json,
│   │                      skills.json, site.json (faits du hero, chaîne de production)
│   └── schema.ts          validateurs maison : chemin fautif nommé, unions fermées, URL https, unicité
├── data/index.ts          point d'entrée : exporte experiences, formations, projects, skills, site (validés)
├── types/index.ts         contrats du contenu (Experience, Project, SkillGroups, SiteContent…)
├── lib/contact.ts         logique pure du formulaire : validation, échappement, envoi, erreurs typées
├── hooks/
│   ├── themeContext.ts    contexte du thème
│   ├── useTheme.tsx       ThemeProvider (classe sur <html>, favicon, theme-color, suivi système)
│   ├── useThemeContext.ts useTheme()
│   ├── useActiveSection.ts section visible (IntersectionObserver) pour la navigation
│   └── useItemsPerPage.ts éléments par page selon la largeur (useSyncExternalStore)
├── components/
│   ├── navbar/            Navbar, NavLinks, MobileMenu, NavbarBrand, items
│   ├── ui/                primitives : Button, Card, ChipList, Container, NewWindowHint,
│   │                      NoWrapHyphens, Reveal, Section, Tag, BrandIcons
│   ├── Hero.tsx, HeroStatic.tsx, DeploymentChain.tsx
│   ├── Experience.tsx, Projects.tsx, Skills.tsx, Education.tsx, Pagination.tsx
│   ├── Contact.tsx, ContactChannels.tsx, ContactForm.tsx
│   ├── ThemeToggle.tsx, Footer.tsx
│   └── *.test.tsx         tests à côté de chaque composant
└── test/                  setup Vitest (jsdom, jest-dom, stubs) et faux IntersectionObserver
tests/csp.test.ts          garde-fous hors application : hashes CSP, origine de l'API de contact
public/                    favicons, og-image.png, 404.html + 404.css, robots.txt, sitemap.xml, manifest, fonts/
.docker/                   Dockerfile multi-stage (node:26 → httpd:2.4, digests épinglés), 000-default.conf
.github/workflows/         ci.yml (lint, types, tests, build), security.yml, zap-*.yml, create-branch-from-issue.yml
```

## Flux du contenu

1. Les fichiers `src/content/*.json` sont la source de vérité. Pour changer un texte, une date,
   une technologie ou un projet, on modifie le JSON, jamais un composant.
2. `src/data/index.ts` importe chaque fichier et le passe au validateur correspondant de
   `src/content/schema.ts`. Une donnée invalide lève une `ContentError` qui nomme le chemin
   (« projects[3].status ») : le serveur de dev et la suite de tests échouent immédiatement.
3. Les composants consomment les exports typés (`experiences`, `formations`, `projects`,
   `skills`, `site`). `site.json` porte aussi les faits du hero et les six étapes de la chaîne
   de production affichée dans `DeploymentChain`.

Règles vérifiées par le schéma : textes non vides, catégories de projet parmi `pro | perso |
formation`, statuts parmi `En production | En cours | Terminé | Livré`, liens en `https://`,
titres de projet uniques, aucun doublon dans les listes de pastilles (clés d'affichage),
familles de compétences connues (`data_ai` optionnelle).

## Thème clair / sombre

- `index.html` contient un script inline qui lit `localStorage.theme` puis
  `prefers-color-scheme` et pose `dark` ou `light` (plus `js`) sur `<html>` avant le premier
  rendu : aucun flash. Ce script est autorisé par son hash sha256 dans la CSP Apache ;
  `tests/csp.test.ts` recalcule le hash et échoue si le script change sans la CSP.
- `ThemeProvider` lit cette classe comme état initial, met à jour le favicon et les métas
  `theme-color`, suit le système tant que l'utilisateur n'a pas basculé manuellement (le choix
  manuel prime pour la session, même sans stockage) et persiste le choix dans `localStorage`.
- Les tokens vivent dans `src/index.css` (`:root` et `.dark`) et sont exposés à Tailwind v4 par
  `@theme inline` ; seules les variables changent entre les deux modes.

## Mouvement

Une seule entrée (`ui/Reveal`) : opacité + 8 px, 480 ms, décalée de 60 ms par élément, déclenchée
par IntersectionObserver ; le filet d'en-tête de section se trace à l'arrivée ; le point de
signal de la chaîne de production descend le rail une fois (animation `transform`). Sans
JavaScript, sans IntersectionObserver ou sous `prefers-reduced-motion`, tout est visible
d'emblée. Le nom, l'énoncé et le paragraphe du hero (élément LCP) ne s'animent jamais et sont
recopiés statiquement dans `index.html` (test `HeroStatic.test.tsx`).

## Formulaire de contact

`ContactForm` valide en direct (format signalé au départ du champ, champ vide reproché à
l'envoi, puis validation à chaque frappe), avec `aria-invalid`, `aria-describedby` et une région
de statut. `lib/contact.ts` envoie `POST { from, subject, html }` vers `VITE_MAILER_URL`
(`AbortSignal.timeout` 10 s, sans cookies ni referer) et classe les échecs : délai, réseau,
refus 4xx, limite 429, service indisponible (5xx ou page HTML en 200). Un champ piège invisible
neutralise les robots. Si `VITE_MAILER_URL` est absente ou invalide, le formulaire cède la place
à l'adresse email. L'échappement côté client n'est pas une barrière de sécurité : l'API
(dépôt portfolio-back) doit valider et limiter de son côté.

## Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `VITE_MAILER_URL` | non (prod : oui) | URL https de l'API de contact, inlinée au build. Sans elle, repli email. Le Dockerfile refuse un build sans URL https et vérifie qu'elle est dans le bundle. |

Toute variable préfixée `VITE_*` est inlinée dans le bundle public : n'y mettre aucun secret.

## Build, image et serveur

- `npm run build` = `tsc -b` puis `vite build` ; un seul chunk JS (~86 ko gzip), une feuille
  CSS, polices auto-hébergées (`public/fonts`, `font-display: swap`, Bricolage préchargée).
- Dockerfile multi-stage : `node:26-alpine` (build) → `httpd:2.4-alpine` (service), images
  épinglées par digest, `apk upgrade`, `HEALTHCHECK`, seul `dist/` est copié.
- Apache (`.docker/000-default.conf`) : CSP stricte (`script-src 'self'` + hash du script de
  thème, `style-src 'self'`, `connect-src` limité à l'API de contact), COOP/COEP/CORP, nosniff,
  Permissions-Policy, Referrer-Policy, `ErrorDocument 404 /404.html` (pas de soft-404), cache
  immutable pour `/assets`, `no-cache` pour les fichiers racines, méthodes limitées à GET/HEAD.
  Validation sans daemon Docker : `httpd -t` depuis une copie de la conf.
- Déploiement : `make build && make up` (compose derrière nginx-proxy et Cloudflare Tunnel).
  Retour arrière : relancer le conteneur sur l'image précédente ; le site est statique, aucune
  donnée à migrer.

## Intégration continue

| Workflow | Déclencheur | Contenu |
|---|---|---|
| `ci.yml` | PR, push main | lint, `tsc -b`, tests avec seuils de couverture 80 %, build |
| `security.yml` | PR, push main, mensuel | Trivy (lockfile) et Gitleaks via `workflows-reusable` (épinglé par SHA) |
| `zap-baseline.yml` / `zap-full-scan.yml` | PR / hebdomadaire | scans DAST ZAP sur l'app buildée |
| `create-branch-from-issue.yml` | issue ouverte par un membre | branche créée depuis l'issue |

Dependabot suit npm, les digests Docker et les SHA d'actions, avec un délai de 7 jours.

## Tests

Voir `docs/TESTING.md`. En bref : Vitest + React Testing Library sous jsdom, tests à côté des
sources, couverture mesurée sur `src/hooks`, `src/components`, `src/lib`, `src/content` et
`src/config.ts` (seuils 80 %), garde-fous dans `tests/`.

## Ancres de la page

`#about` (hero), `#experiences`, `#projects`, `#skills`, `#education`, `#contact`, `#main`
(cible du lien d'évitement). Le menu surveille les cinq sections ; le hero est atteint par le
logo et « Haut de page ».
