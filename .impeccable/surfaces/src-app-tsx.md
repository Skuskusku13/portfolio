---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["index.html","src/components/Hero.tsx","src/components/navbar/index.tsx"]
---

# Surface brief — page unique du portfolio (src/App.tsx)

## Scope et mode

Surface : la page unique du portfolio de Dan Levy (hero, expériences, projets, compétences, formation, contact, footer). Mode visiteur : **Persuade**. Redesign du système visuel **à structure constante** : l'ordre des sections, le contenu factuel, le formulaire de contact (POST JSON vers `VITE_MAILER_URL`), la bascule clair/sombre, le logo hexagonal et la pagination (corrigée) sont conservés.

## Audience, job, action, preuve, contraintes

- Audience : recruteurs techniques et tech leads, souvent sur mobile, 1 à 3 minutes.
- Job : vérifier le niveau et la cohérence du parcours, puis prendre contact.
- Action principale : « Me contacter » visible à toute largeur dans la navigation ; email affiché en clair et copiable ; LinkedIn et GitHub en actions directes.
- Preuve : les faits (CDI Meilleurtaux Placement depuis sept. 2026, Bac+5 Architecte SI, dépôts publics) et la chaîne de production réelle de ce site (GitHub Actions avec npm audit, Trivy, Gitleaks, ZAP ; image Docker multi-stage ; Apache durci avec CSP ; reverse proxy ; dlyhub.com) dessinée au premier écran.
- Contraintes : CSP `font-src 'self'`, `style-src 'self'`, `img-src 'self' data:` ; polices auto-hébergées ; aucune photo ni CV ; textes réécrits à faits constants ; français.
- Barre de qualité fixée par l'utilisateur : Stripe et Apple (finition premium, hiérarchie forte, transitions douces, matériaux subtils). L'utilisateur a explicitement refusé les tics IA : hero centré sur dégradé, grille de cartes à puces, texte en dégradé, halos lumineux, pastilles au-dessus des titres.

## Direction contract

THESIS: Un portfolio qui se lit comme un document de référence d'ingénieur, à la finition d'un site Apple ou Stripe : une seule idée par écran, des faits avant des adjectifs, et la preuve au premier écran. Il refuse l'arrangement par défaut de la catégorie (hero centré à dégradé + deux boutons + grilles de cartes identiques à pastilles).

OWN-WORLD: Fond gris-blanc froid (#F5F5F7) avec surfaces blanches, encre #1D1D1F, un seul accent cobalt (#163DCC clair / #7FA2FF sombre) réservé aux actions et aux liens ; filets d'un pixel (#D2D2D7) comme seul séparateur ; aucune ombre portée décorative, une seule ombre douce décalée pour les surfaces flottantes (menu, toast). Typographie : Bricolage Grotesque variable (axe optique 12–96, graisse 300–700, sous-ensembles latin et latin-ext auto-hébergés) pour titres et corps ; Red Hat Mono uniquement pour les données (dates, versions, listes de technologies). Rythme sur 8 px, sections à padding réduit sur mobile (48 px haut / 24 px bas, 80 / 40 sur desktop), mesure du corps 60–70 caractères, titres à -0,02 em, chiffres tabulaires. Icônes lucide à trait 1,5 px, jamais seules sans libellé. Mode sombre en bleu nuit (demande utilisateur, jamais un noir plat) : canvas #0A1020, surface #121B30, encre #EEF2F8, filets #273354, accent #7FA2FF.

STORY: Le visiteur comprend en cinq secondes qui est Dan (nom, métier, statut CDI, niveau), voit qu'il opère réellement une chaîne de production (le schéma), parcourt un parcours dont le poste actuel domine, lit trois réalisations concrètes avant les exercices, et contacte Dan sans chercher : le bouton est dans la navigation, l'adresse est en clair.

FIRST VIEWPORT: Desktop 1440×900. Navigation fixe translucide de 64 px : logo + « Dan Levy » à gauche, liens de sections au centre, « Me contacter » (bouton accent) et bascule de thème à droite. Sous la navigation, une grille deux colonnes 7/5 sur gouttière de 48 px, alignée à gauche, pas centrée, sans aucune ligne-étiquette au-dessus du titre. Colonne gauche : h1 « Dan Levy » en 64–72 px graisse 600 ; juste dessous, l'énoncé en 26 px graisse 400 (« Développeur Back-end & DevOps. Je construis des back-ends Symfony et l'infrastructure qui les fait tourner. ») ; paragraphe de 18 px sur trois lignes (Bac+5 Architecte SI, CDI chez Meilleurtaux Placement depuis sept. 2026, conteneurs/CI/monitoring/sécurité en production ; aucune mention de l'alternance dans les textes descriptifs, demande utilisateur) ; rangée d'actions avec icônes (enveloppe + « Me contacter » en accent, logos LinkedIn et GitHub + libellé en boutons secondaires à filet, demande utilisateur) ; puis trois faits en casse normale sur trois rangées courtes à filets horizontaux (En CDI chez Meilleurtaux Placement / Bac+5 Architecte SI / En poste depuis oct. 2021), sans étiquette au-dessus des valeurs ni compteur ; la ligne unique a été écartée parce qu'elle se repliait avec un séparateur orphelin. Colonne droite : la chaîne de production de ce site, six étapes en nœuds HTML sur un rail vertical d'un pixel (Code → CI sécurité → Build Docker → Apache durci → Reverse proxy et TLS → dlyhub.com), libellés en texte réel 15 px et détails en mono 12 px, un point de signal qui descend le rail une fois au chargement. Mobile 390 : colonne unique dans l'ordre texte → actions (« Me contacter » pleine largeur, LinkedIn et GitHub côte à côte) → chaîne de production → faits ; la tête de la chaîne entre dans le premier écran.

FORM: Direction épinglée par l'utilisateur après refus du tirage (« structure conservée, plus original et plus élégant, sans tics IA, barre Stripe/Apple »). Position : hors liste ; le tirage (seed:e05606ef30da91ae) est consigné comme supplanté par le brief, jamais comme choisi. Interaction signature : le point de signal qui parcourt la chaîne de production au chargement, puis les filets de section qui se tracent à l'arrivée dans le viewport. Grammaire de mouvement : une seule entrée (opacité + 8 px, 480 ms, ease-out-quint) orchestrée par section avec décalage de 60 ms, aucune transition de thème, respect de `prefers-reduced-motion`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Registre des sections

Décision utilisateur (après essai d'un registre sans boîtes, jugé moins lisible) : Expériences, Projets, Compétences et Formation sont des **cartes** (`ui/Card` : surface blanche, bleu nuit en sombre, filet d'un pixel, coins 16 px, padding 24 px, inertes, sans ombre ni mouvement au survol), et les technologies sont des **pastilles** lisibles (`ui/ChipList` : sans 13 px à pleine encre, fond canvas, filet, coins pleins). Les cartes projet portent le statut en tête à droite du titre et un pied calé en bas (pastilles, catégorie, dépôts). L'en-tête de section garde son filet qui se trace ; les cartes entrent avec la grammaire Reveal, décalées de 60 ms.

## Décisions ouvertes

- Aucune image raster n'est produite ; le schéma est un SVG inline authored.
- Les items de compétences restent ceux de `src/data/index.ts` (faits inchangés) ; seule la casse est normalisée.
- `og:image` reste l'icône 512 tant qu'aucune image sociale n'est fournie.
