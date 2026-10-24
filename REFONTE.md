# Refonte du design — dossier de passation

Date : 16–17 octobre 2026. Branche : `hero-fix`. Rédigé alors que rien n'était commité ; la refonte a été commitée en lots logiques le 24 octobre 2026 (voir `git log`), l'ancienne version reste dans l'historique.

## 1. Ce qui a été demandé et décidé

- Objectif : un portfolio professionnel pour se présenter à des recruteurs et tech leads, « élégant, propre, beau », sans les tics de design IA, en gardant la structure existante (hero, expériences, projets, compétences, formation, contact).
- Barre de qualité choisie : Stripe / Apple. Le tirage de « mondes visuels » du skill Impeccable (changelog, pulp, mecha…) a été refusé ; la direction a été épinglée dans la structure d'origine.
- Décisions explicites : cartes et pastilles de technologies conservées (une version en listes texte a été jugée moins lisible) ; icônes à côté de « Me contacter », LinkedIn et GitHub ; mode sombre en bleu nuit plutôt qu'en noir ; plus aucune mention de l'alternance dans les textes descriptifs (les badges de contrat restent sur les postes passés) ; pagination conservée et corrigée ; logo hexagonal et bascule clair/sombre conservés ; palette libre ; aucune photo ni CV ; textes réécrits à faits constants.

## 2. Ce qui a changé

### Système de design (`src/index.css`, `DESIGN.md`, `.impeccable/design.json`)
- Tokens clair / sombre en variables CSS exposées à Tailwind v4 par `@theme inline` : canvas, surface, encre (3 niveaux), filets, accent cobalt (#163DCC clair / #7FA2FF sombre), statuts ok / warn / danger, ombre unique, easing, rayons 4 / 6 / 10 / 16 px. Sombre bleu nuit : #0A1020 / #121B30.
- Typographie auto-hébergée (CSP `font-src 'self'`) : Bricolage Grotesque variable (titres et corps, axe optique) et Red Hat Mono (dates, périodes, statuts, détails techniques). Fichiers et licences dans `public/fonts/`.
- Surfaces du navigateur thémées : sélection, focus visible, caret, scrollbar, `scroll-padding-top` sous l'en-tête fixe.
- Grammaire de mouvement : une seule entrée (`Reveal`, opacité + 8 px, 480 ms, décalée de 60 ms par élément), visible par défaut sans JS et sous `prefers-reduced-motion` ; filet d'en-tête de section qui se trace ; point de signal de la chaîne de production.

### Composants (`src/components/`)
- Primitives dans `ui/` : `Button` (primary / secondary / ghost), `Tag` (statut, mono), `ChipList` (pastilles de technos), `Card`, `Section` (en-tête titre + chapeau), `Container`, `Reveal`, `BrandIcons` (GitHub, LinkedIn), `NoWrapHyphens`.
- `Hero` : nom en h1, énoncé, paragraphe de pratique, trois boutons avec icônes, trois faits vérifiables ; à droite `DeploymentChain`, la chaîne réelle de production de ce site (code → CI sécurité → build Docker → Apache durci → réseau → dlyhub.com), nœuds cliquables vers le dépôt, animée une fois au chargement. Sur mobile la chaîne passe sous les boutons.
- `Experience`, `Education`, `Skills`, `Projects` : cartes inertes (sans ombre ni mouvement au survol), pastilles de technologies, statut en tête des cartes projet, catégorie et liens « Code source » en pied. Projets : filtres segmentés `aria-pressed`, plus de menu déroulant ni d'icône GitHub barrée.
- `Pagination` : page recadrée quand la largeur ou le filtre change (ancien bug « Page 4 sur 2 »), retour en haut de section, compteur `aria-live`, focus conservé. Compétences : 9 familles visibles sur desktop, pagination en dessous de 1024 px.
- `Contact` : adresse email en clair et copiable, LinkedIn / GitHub avec icônes, formulaire avec labels, `autocomplete`, limites, états succès / erreur persistants avec repli `mailto:`, message échappé avant envoi (le champ s'appelle `html`). Contrat d'envoi inchangé : POST JSON `{ from, subject, html }` vers `VITE_MAILER_URL`.
- Navigation : section active soulignée, « Me contacter » visible à toute largeur, menu mobile accessible (`aria-expanded`, focus, Échap, tap extérieur), bascule de thème libellée en français.

### Contenu (`src/data/index.ts`, `src/types/index.ts`)
- Champ `summary` ajouté aux expériences (une phrase factuelle par poste). Description du projet « Portfolio » corrigée (le portail IP n'existe plus). Coquilles corrigées (« protocole AMQPS », « Workflows réutilisables », casse des technos), statut « Plusieurs projets livrés » → « Livré ». Dates, employeurs, diplômes et listes de technologies inchangés.

### Production et sécurité
- `index.html` : script d'initialisation du thème inline (plus de flash clair → sombre), autorisé par son hash sha256 dans la CSP de `.docker/000-default.conf` (à recalculer si le script change, comme pour le JSON-LD) ; préchargement des polices ; métas `theme-color` et descriptions mises à jour (plus de « Expert » ni « Freelance »).
- `.docker/000-default.conf` : hash CSP ajouté, `Cache-Control` 30 jours pour `/fonts/*.woff2`.
- Supprimés : `src/App.css` (boilerplate Vite jamais importé), `src/components/Icons.tsx`, `public/theme-init.js`.
- `package.json` inchangé. `node_modules` : le binaire natif `@rolldown/binding-darwin-arm64` a été installé en `--no-save` pour que Vite 8 démarre sur ce Mac (bug npm sur les dépendances optionnelles) ; relancer `npm install` si besoin.

## 2 bis. Montée de version (17 octobre 2026)

Vérifiée contre les dernières publications npm et le calendrier Node.js.

| Composant | Avant | Après | Note |
|---|---|---|---|
| Node (Dockerfile, CI `node-version`, `.nvmrc`) | 22 | 26 | Node 26 (ta version locale, 26.10) entre en LTS le 28 octobre 2026 ; Node 24 passe en maintenance le 20 octobre ; Node 22 est en maintenance jusqu'en avril 2027 |
| React / react-dom | 19.2.3 | 19.3.1 | |
| Vite | 8.0.16 | 8.3.4 | redémarrage du dev server nécessaire après la montée |
| @vitejs/plugin-react | 5.2.0 | 6.1.2 | |
| Tailwind CSS / @tailwindcss/vite | 4.3.1 | 4.3.3 | |
| TypeScript | 5.9.3 | 6.0.3 | **pas 7.0** : le compilateur natif Go n'est pas encore supporté par typescript-eslint (plage `<6.1`) ; passer à 7 quand typescript-eslint le permettra |
| typescript-eslint | 8.65.0 | 8.71.2 | |
| ESLint / @eslint/js / globals | 10.8.0 / 9.39 / 16.5 | 10.13.0 / 10.0.1 / 17.13 | |
| eslint-plugin-react-refresh | 0.4.26 | 0.5.7 | |
| lucide-react | 0.562 | 1.59.0 | v1 retire les icônes de marque (GitHub, LinkedIn) : déjà remplacées par `ui/BrandIcons.tsx` ; `aria-hidden` par défaut sur les icônes |
| @types/node / react / react-dom | 24 / 19.2 / 19.2 | 26 / 19.3 / 19.3 | |
| autoprefixer, postcss | présents | supprimés | inutilisés : Tailwind v4 via le plugin Vite, aucun `postcss.config` |
| httpd (image finale) | 2.4-alpine | 2.4-alpine | déjà la ligne courante d'Apache |

`npm run build`, `npm run lint` et `npx tsc -b` verts après la montée. Le bundle JS passe de 230 à 264 Ko (72,6 → 82,6 Ko gzip) avec React 19.3 et lucide 1.x ; Lighthouse reste à 100 sur desktop (voir ci-dessous). `CLAUDE.md` mentionne encore `node:22-alpine` dans la description de la stack.

## 2 ter. Sécurité Docker (17 octobre 2026)

Revue de `.docker/Dockerfile`, `.docker/000-default.conf`, `.docker/docker-compose.yml`, `.dockerignore` et des workflows. Pas de daemon Docker sur ce Mac : l'image n'a pas pu être construite ni scannée ici. La configuration Apache a été validée par `httpd -t` (Apache 2.4.67 livré avec macOS, modules headers/rewrite/dir/authz_core chargés) ; `npm run build` et `npm run lint` restent verts.

Constat : aucune faille exploitable à distance identifiée. Le site est statique, aucun port n'est publié, l'origine est derrière nginx-proxy et Cloudflare Tunnel, `.dockerignore` exclut `.env*` et `.git`, `VITE_MAILER_URL` est une valeur publique. Les changements ci-dessous réduisent la surface et sécurisent la chaîne d'approvisionnement :

| Fichier | Changement | Pourquoi |
|---|---|---|
| `.docker/Dockerfile` | `node:26-alpine` et `httpd:2.4-alpine` épinglés par digest (index multi-arch) | une image de base remplacée sous le même tag ne passe plus inaperçue ; Dependabot propose les mises à jour |
| `.docker/Dockerfile` | `apk upgrade --no-cache` dans l'image finale | correctifs Alpine publiés après la construction de l'image de base |
| `.docker/Dockerfile` | `HEALTHCHECK` (wget BusyBox sur 127.0.0.1) | état healthy dans `docker ps`, exploitable par compose (`depends_on`) ou un auto-heal |
| `.docker/000-default.conf` | `ServerTokens Prod`, `ServerSignature Off`, `TraceEnable Off` | plus de version Apache dans l'en-tête `Server` ni dans les pages d'erreur ; TRACE répond 405 |
| `.docker/000-default.conf` | `Options SymLinksIfOwnerMatch` (liste absolue) | l'ancienne forme `-Indexes +FollowSymLinks` fusionnait avec le `Indexes FollowSymLinks` de httpd.conf |
| `.docker/000-default.conf` | `<LimitExcept GET HEAD>` et `<FilesMatch "^\.">` → 403 | site statique : seules les lectures sont servies, aucun fichier caché ne sort |
| `.docker/docker-compose.yml` (**jamais commité**) | `no-new-privileges`, `pids_limit: 512`, mémoire 256 Mo, rotation des logs json-file | à reporter à la main dans le compose du serveur, ce fichier ne voyage pas par git |
| `.dockerignore` | `.impeccable` exclu | captures et briefs hors du contexte de build |
| `.github/dependabot.yml` (nouveau) | npm, docker, github-actions chaque lundi 7 h (Europe/Paris) | suit les digests et les SHA épinglés |
| `.github/workflows/create-branch-from-issue.yml` | `actions/checkout` v4 → v7.0.1 et `create-issue-branch` `@main` → v1.9.0, épinglés par SHA de commit | une action tierce suivie sur `main` avec `contents: write` exécutait n'importe quel code poussé en amont ; le saut de 3 majeures de checkout n'a pas pu être testé ici (`gh` non authentifié) |

Hero : la chaîne « du dépôt à votre écran » mentionne désormais Cloudflare Tunnel à l'étape Réseau, `node:26` au build, et plus `npm audit` en CI (retiré en v1.2.1).

Reste à décider, non appliqué faute de daemon pour tester :
- **Apache sans root** : le processus maître tourne en root (comportement de l'image officielle, les workers sont `daemon`). Passage en non-root = `Listen 8080` + `USER daemon` dans le Dockerfile, `VIRTUAL_PORT: 8080` dans le compose, port du `HEALTHCHECK` à adapter.
- **`cap_drop: [ALL]` + `cap_add: [SETUID, SETGID, NET_BIND_SERVICE, KILL]`** et **`read_only: true`** avec `tmpfs` sur `/usr/local/apache2/logs` et `/tmp` : à valider par un `docker compose up` avant la prod (`KILL` est nécessaire au maître root pour signaler les workers `daemon`).
- **Scan de l'image en CI** : Trivy ne scanne que `package-lock.json` ; ajouter un job `docker build` + `trivy image` dans `workflows-reusable`.
- **Cloudflare** : HSTS et « Always Use HTTPS » se règlent à l'edge, pas dans Apache. Vérifier que Rocket Loader, Email Address Obfuscation et Web Analytics sont désactivés sur la zone : leurs scripts inline seraient bloqués par la CSP (`script-src 'self'` + hashes).
- **ZAP full scan** : les sondes POST/PUT reçoivent désormais 403 ; attendu, mais le nombre d'alertes bougera au prochain run.

## 3. Mesures

| Mesure | Avant | Après |
|---|---|---|
| Critique design Impeccable (10 heuristiques, /32) | 16 | 22 |
| Audit technique Impeccable (/20) | 11 | 16 |
| Détecteur Impeccable (source + page rendue desktop et 390 px) | 3 advisory (contrastes) | 0 |
| Lighthouse desktop (perf / a11y / bonnes pratiques / SEO) | non mesuré | 100 / 100 / 100 / 100 |
| Lighthouse mobile | non mesuré | 99 / 100 / 100 / 100, LCP 2,1 s |
| Poids des polices | aucune police chargée | 142 Ko au total (sous-ensembles latin + latin-ext) |

Check scripté sur 7 formats (390, 844 paysage, 768, 1024, 1280, 1440, 1920) : aucun débordement horizontal, aucun élément masqué, tous les contrôles nommés, thème / menu / filtres / pagination / formulaire fonctionnels, aucune erreur console.

Revue de finition du skill (agent dédié) : disposition **ship** sur l'ensemble des corrections demandées, sans régression.

## 4. Artefacts Impeccable

- `PRODUCT.md` : vérité produit (audience, positionnement, contraintes, engagements de marque).
- `DESIGN.md` et `.impeccable/design.json` : système de design dérivé du code livré (écrits par le documenteur du skill).
- `.impeccable/surfaces/src-app-tsx.md` : contrat de direction (THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM, FINISH, registre des sections).
- `.impeccable/critique/` : deux snapshots de critique (avant / après), lus par `/impeccable polish`.
- `.impeccable/review/` : captures de référence et résultats du détecteur.
- Les esquisses HTML du tirage de direction refusé ont été supprimées (elles n'avaient aucune valeur d'approbation).

## 5. Ce qui reste ouvert

- **Pagination sur mobile** : 4 pages de projets et 2 pages de compétences à 390 px. La critique recommande d'afficher tout en dépliant les projets de formation ; conservé tel quel par choix.
- **Pastilles de compétences** : la critique estime que les familles outils / IDE / systèmes d'exploitation diluent le niveau perçu et suggère 4 familles alignées sur le poste. Données conservées telles quelles par choix.
- **Statut « En cours » du projet Pipeline CI/CD** : des versions de `workflows-reusable` sont publiées et utilisées par ce site ; « En production » serait plus juste.
- **Échelle typographique non tokenisée** : 43 tailles en `text-[Npx]` dans les composants ; à passer en tokens `--text-*` si le système doit vivre longtemps. Depuis que `DESIGN.md` existe, le détecteur Impeccable émet 40 avis (`design-system-font-size`, non bloquants) sur ces classes, plus un avis sur le rayon de 2 px de l'anneau de focus ; ils disparaîtront avec la tokenisation.
- **Cibles tactiles de 36 px** (boutons `sm`) : conformes WCAG AA (24 px), sous la recommandation de 44 px.
- **Impression** : les sections animées restent visibles sans JS, mais aucune feuille `@media print` n'a été écrite.
- `docs/ARCHITECTURE.md` est périmé (il ne connaît ni `src/hooks/`, ni `src/components/ui/`, ni la logique de thème) et `CLAUDE.md` y renvoie ; à mettre à jour, ainsi que `CLAUDE.md` lui-même (`/save-claudemd`).

## 6. Pour reprendre

1. Lancer `npm run dev`. Pour revoir l'ancienne version sans mélanger les arbres : `git stash -u` puis `git stash pop` (le `-u` est indispensable, la refonte contient beaucoup de fichiers non suivis), ou un `git worktree add ../portfolio-old HEAD`.
   Deux serveurs ont été laissés en marche par la session de refonte : le dev server sur http://127.0.0.1:5173/ et `vite preview` (build de production) sur http://127.0.0.1:4173/. Pour les arrêter : `lsof -ti:5173,4173 | xargs kill`.
2. Vérifier `npm run build`, `npm run lint`, `npx tsc -b` (tous verts au moment de la passation).
3. Commiter en excluant comme d'habitude `.docker/docker-compose.yml`, `BACKLOG.md`, `CLAUDE.md`. Les nouveaux fichiers à inclure : `PRODUCT.md`, `DESIGN.md`, `REFONTE.md`, `.impeccable/` (ou seulement `design.json` et `surfaces/` si l'on ne veut pas versionner les captures), `public/fonts/`, `src/components/ui/`, `src/components/DeploymentChain.tsx`, `src/hooks/useActiveSection.ts`, `src/hooks/useItemsPerPage.ts`, `.github/dependabot.yml`. Modifiés et à inclure aussi : `.docker/Dockerfile`, `.docker/000-default.conf`, `.dockerignore`, `.github/workflows/create-branch-from-issue.yml`. Le durcissement de `.docker/docker-compose.yml` reste hors git : le reporter sur le serveur.
4. Après déploiement, contrôler dans le navigateur que la CSP n'émet aucune violation (script de thème inline hashé, polices locales).
