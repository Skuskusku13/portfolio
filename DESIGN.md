---
name: Portfolio Dan Levy
description: Un portfolio d'ingénieur qui se lit comme un document de référence, à la finition Apple / Stripe, en clair et en bleu nuit.
colors:
  canvas: "#f4f6fb"
  surface: "#ffffff"
  surface-2: "#eef2fa"
  ink: "#14213d"
  ink-2: "#46547a"
  ink-3: "#65718f"
  line: "#d8deeb"
  line-strong: "#14213d"
  line-input: "#7f8aa8"
  accent: "#1a46e0"
  accent-hover: "#1538bd"
  accent-ink: "#ffffff"
  ok: "#1b8a4e"
  warn: "#9a6400"
  danger: "#b3261e"
  canvas-dark: "#0a1124"
  surface-dark: "#141e3a"
  surface-2-dark: "#1b2745"
  ink-dark: "#f0f4fb"
  ink-2-dark: "#b3bdd3"
  ink-3-dark: "#8f9bb6"
  line-dark: "#2b3960"
  line-strong-dark: "#f0f4fb"
  line-input-dark: "#71809f"
  accent-dark: "#8fb1ff"
  accent-hover-dark: "#a9c4ff"
  accent-ink-dark: "#0a1124"
  ok-dark: "#62d08a"
  warn-dark: "#e8bb5f"
  danger-dark: "#ff8f85"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "52px / 64px (sm) / 72px (lg)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "22px / 26px (sm)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "28px / 32px (sm)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px / 17px / 18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  meta:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px / 14px / 15px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "Red Hat Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
    fontFeature: "tnum"
  label:
    fontFamily: "Red Hat Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: "tnum"
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    textColor: "{colors.ink-2}"
    typography: "{typography.meta}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-ghost-hover:
    textColor: "{colors.ink}"
  button-sm:
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  filter-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  filter-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  tag:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "0 8px"
    height: "24px"
  tag-accent:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "0 8px"
    height: "24px"
  chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.meta}"
    padding: "4px 0"
  nav-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    padding: "4px 0"
  navbar:
    backgroundColor: "{colors.canvas}"
    height: "64px"
---

# Design System: Portfolio Dan Levy

## Overview

**Creative North Star: "Le document de référence de l'ingénieur"**

Le site se lit comme la fiche technique d'un système en production, mise en page avec la finition d'un site Apple ou Stripe : une seule idée par écran, des faits avant des adjectifs, et la preuve (la chaîne de production réelle de ce site) au premier écran. Le canvas est un gris-blanc froid, les surfaces sont blanches, l'encre est quasi noire, et tout séparateur est un filet d'un pixel. Un seul accent, un cobalt profond, est réservé aux actions, aux liens et au point de signal ; il n'orne jamais.

La densité est celle d'un document bien composé : conteneur de 1 200 px, colonnes 7/5 ou 5/6 sur douze, corps en 16–18 px à mesure courte (56–64 caractères), titres serrés à -0,02 em, chiffres tabulaires. Tout ce qui est donnée (date, période, statut, versions, détail technique) passe en Red Hat Mono ; tout ce qui est discours reste en Bricolage Grotesque. Le mouvement est une grammaire d'une seule phrase : les blocs entrent une fois par opacité et 8 px, décalés de 60 ms, et le filet de chaque en-tête de section se trace à l'arrivée dans le viewport.

Le mode sombre est un bleu nuit profond, jamais un noir plat : le canvas, les surfaces et les filets gardent une teinte bleue, l'accent passe en bleu clair et les états sémantiques s'éclaircissent. La structure, les rayons et le mouvement sont strictement identiques entre les deux modes ; seules les variables changent, sans transition de thème.

Le système refuse explicitement les tics par défaut de la catégorie : hero centré sur dégradé, texte en dégradé, halos lumineux, étiquettes au-dessus des titres, cartes qui se soulèvent au survol, icônes sans libellé dans le contenu.

**Key Characteristics:**
- Un seul accent cobalt (#1a46e0 clair, #8fb1ff sombre), réservé aux actions, liens, icônes de titre et point de signal.
- Filets d'un pixel comme unique séparateur ; une seule ombre, portée uniquement par le menu mobile flottant.
- Deux familles : Bricolage Grotesque variable (300–700, axe optique) pour le discours, Red Hat Mono pour les données.
- Cartes inertes à coins 16 px ; pastilles de techno en sans 13 px à coins pleins ; étiquettes de statut en mono 12 px à coins 4 px.
- Une seule entrée en mouvement (480 ms, ease-out-quint, décalage 60 ms) et un filet qui se trace ; tout s'éteint sous `prefers-reduced-motion`.
- Surfaces du navigateur thémées : sélection, caret, focus, barre de défilement, `theme-color`.

## Colors

Une palette à deux modes, construite sur un canvas froid légèrement bleuté, une encre marine à trois niveaux, un filet, un accent cobalt et trois tons sémantiques ; le sombre n'est pas l'inverse du clair mais un bleu nuit à même structure. Valeurs revues le 24 octobre 2026 pour un rendu plus chaleureux sans seconde teinte : canvas et filets teintés, encre marine, accent un peu plus vif.

### Primary
- **Cobalt** (`accent`, #1a46e0 clair / #8fb1ff sombre) : fond du bouton principal, couleur des liens de dépôt (« Code source », liens projet), icônes des titres de compétences, point de signal et repères allumés de la chaîne de production, tag `accent` (niveaux de diplôme), survol des étapes de la chaîne, sélection de texte, caret des champs, anneau de focus. Le logo hexagonal reprend exactement cette valeur dans chaque mode.
- **Cobalt enfoncé** (`accent-hover`, #1538bd / #a9c4ff) : uniquement le survol du bouton principal.
- **Encre sur cobalt** (`accent-ink`, #ffffff / #0a1124) : texte posé sur l'accent (bouton principal, texte sélectionné, lien d'évitement).

### Neutral
- **Canvas froid** (`canvas`, #f4f6fb / #0a1124) : fond de page et de la barre de navigation (à 85 % avec flou), fond des pastilles de techno posées sur une carte, texte du filtre actif.
- **Surface** (`surface`, #ffffff / #141e3a) : cartes, figure de la chaîne de production, bouton secondaire, filtres au repos, champs du formulaire, repères de la chaîne au repos.
- **Surface relevée** (`surface-2`, #eef2fa / #1b2745) : seul usage réel : fond de survol des boutons icône de la barre (thème, menu).
- **Encre** (`ink`, #14213d / #f0f4fb) : titres, nom, énoncé du hero, texte des pastilles, employeurs, libellés des champs, fond du filtre actif, soulignement de navigation.
- **Encre secondaire** (`ink-2`, #46547a / #b3bdd3) : paragraphes descriptifs, périodes en mono, liens de navigation au repos, bouton ghost, faits du hero, pied de page.
- **Encre tertiaire** (`ink-3`, #65718f / #8f9bb6) : catégories de projet, école, flèches sortantes au repos, placeholders, point du tag neutre.
- **Filet** (`line`, #d8deeb / #2b3960) : toutes les bordures d'un pixel (cartes, pastilles, tags, champs, boutons secondaires, navbar, rails et séparateurs de listes), rail de la chaîne, pouce de la barre de défilement.
- **Filet fort** (`line-strong`, #14213d / #f0f4fb) : bordure de survol du bouton secondaire, et à 40 % celle des filtres au survol.
- **Bordure de champ** (`line-input`, #7f8aa8 / #71809f) : bordure au repos des champs du formulaire uniquement, assez contrastée sur la surface (≥ 3:1, WCAG 1.4.11) pour qu'un champ soit reconnu comme saisissable. Jamais sur une carte ni un séparateur.

### Semantic
- **Vert OK** (`ok`, #1b8a4e / #62d08a) : point du tag « En production » et « CDI ». Jamais en fond ni en texte.
- **Ambre attention** (`warn`, #9a6400 / #e8bb5f) : point du tag « En cours » et texte du compteur de caractères à 90 % de la limite. Jamais en fond.
- **Rouge erreur** (`danger`, #b3261e / #ff8f85) : texte des erreurs du formulaire, bordure d'un champ invalide, compteur à la limite.

### Named Rules
**The One Accent Rule.** Le cobalt est la seule couleur chromatique du système en dehors des trois points sémantiques. Il signale une action, un lien ou un état actif ; il ne remplit jamais un fond décoratif, un titre ou un dégradé.

**The Dot-Only Semantics Rule.** `ok` et `warn` existent d'abord comme un point de 6 px dans une étiquette à filet neutre, le texte de l'étiquette restant en encre ; seule exception, le compteur de caractères du formulaire passe en `warn` à 90 % de la limite et en `danger` à la limite. `danger` n'apparaît sinon qu'en texte d'erreur et en bordure de champ invalide.

**The Interactive Border Rule.** Un filet décoratif (carte, séparateur, pastille, tag, bouton secondaire) est en `line` ; la bordure d'un composant de saisie est en `line-input`, plus sombre, parce qu'elle doit être perçue à 3:1 pour signaler l'affordance. On ne monte pas `line` pour y parvenir, on ne descend pas `line-input` pour l'harmoniser.

**The Blue Night Rule.** Le sombre est un bleu nuit : canvas #0a1124, surfaces #141e3a, filets #2b3960. Aucune valeur neutre du mode sombre n'est un gris pur ni un noir plat.

## Typography

**Display Font:** Bricolage Grotesque, variable 300–700 avec axe optique auto (avec ui-sans-serif, system-ui, -apple-system, Segoe UI)
**Body Font:** Bricolage Grotesque (même fichier variable, même repli)
**Label/Mono Font:** Red Hat Mono, variable 300–700 (avec ui-monospace, SF Mono, Menlo, Consolas)

**Character:** Une grotesque à caractère pour le discours, une mono sobre pour les faits : le texte parle, les données se lisent comme un relevé. Les deux familles sont auto-hébergées en woff2 (sous-ensembles latin et latin-ext, `font-display: swap`), les latin préchargées, conformément à la CSP `font-src 'self'`. Le corps active `kern` et `liga`, l'optical sizing est automatique, les titres h1–h3 sont à `text-wrap: balance`, les paragraphes à `text-wrap: pretty`.

### Hierarchy
- **Display** (600, 52 px → 64 px (sm) → 72 px (lg), 0.98, -0,02 em) : le nom seul, dans le hero. Peint immédiatement, jamais animé (c'est le LCP).
- **Statement** (400, 22 px → 26 px (sm), 1.3, encre pleine, mesure 26 ch) : l'énoncé du hero sous le nom. Une graisse normale à grande taille, pas un sous-titre gras.
- **Headline** (600, 28 px → 32 px (sm), 1.1, -0,02 em) : titres de section, calés à gauche, sans chapeau.
- **Title** (600, 18 px, 1.3) : titres de cartes projet et formation ; variantes 22 → 24 px pour le poste actuel et 19 → 20 px pour les postes passés dans Expériences ; 16 px avec icône pour les familles de compétences ; 15 px pour le titre de la chaîne et 16 px pour le nom de la marque.
- **Body** (400, 16–18 px, 1.5–1.55, encre secondaire sauf énoncé) : 18 px pour le paragraphe du hero (mesure 56 ch), 16 px pour les résumés d'expérience (64 ch), 15 px pour les descriptions de projet et de formation.
- **Meta** (400 / 500, 13–15 px, 1.5) : liens de navigation (14 px), boutons (15 px md, 14 px sm, graisse 500), libellés de champs (14 px, 500), faits du hero (14 px), catégories (13 px), pied de page (13 px), menu mobile (20 px, 500).
- **Data** (Red Hat Mono 400, 13 px, 1.6, chiffres tabulaires) : périodes d'expérience et de formation, compteur de pagination.
- **Label** (Red Hat Mono 400, 12 px, line-height 1, chiffres tabulaires) : étiquettes de statut et de type, détails techniques des étapes de la chaîne. Casse normale, jamais en capitales espacées.

### Named Rules
**The Mono-for-Data Rule.** Red Hat Mono est réservée aux données vérifiables (dates, périodes, statuts, versions, piles techniques). Aucun titre, aucun bouton, aucun paragraphe n'est en mono ; aucune donnée n'est en gras.

**The Three Weights Rule.** Seules les graisses 400, 500 et 600 sont utilisées (400 corps et données, 500 actions et libellés, 600 titres). Les fichiers couvrent 300–700, mais 300 et 700 n'apparaissent nulle part.

**The No-Kicker Rule.** Aucune ligne-étiquette (eyebrow, kicker, surtitre en capitales) au-dessus d'un h1, h2 ou h3. La hiérarchie se fait par la taille et la graisse, pas par une pastille introductive.

## Layout

Page unique en colonne de lecture : conteneur de 1 200 px centré, gouttières de 20 px (mobile), 32 px (≥ 640 px) et 48 px (≥ 1 024 px). Les compositions à deux colonnes posent une grille de douze à `gap` 48 px : hero 7/5 (texte à gauche, chaîne de production à droite sur deux rangées), en-tête de section 5/6 (titre à gauche, chapeau à partir de la colonne 7), contact 5/6 (canaux directs à gauche, formulaire à droite). Sous 1 024 px, tout se replie en une colonne dans l'ordre du DOM.

Rythme vertical sur 8 px : sections à `padding` 48 px haut / 24 px bas sur mobile, 64 / 32 à partir de 640 px, 80 / 40 à partir de 1 024 px ; le hero commence à 96 / 128 / 144 px pour passer sous la barre fixe de 64 px (`scroll-margin-top` 80 px sur chaque section). L'en-tête de section porte 24 px au-dessus du titre (sous le filet) et 32 → 40 px en dessous. Les grilles de cartes sont à `gap` 20 px, 1 colonne → 2 (≥ 768 px) → 3 (≥ 1 024 px) ; Formation reste en 3 dès 768 px. Points de rupture : 640, 768, 1 024 px (Tailwind) ; la pagination recalcule les éléments par page sur 768 et 1 024 (Projets 3 / 4 / 6, Compétences 5 / 6 / 9).

Navigation fixe de 64 px sur toute la largeur, canvas à 85 % avec flou d'arrière-plan 12 px et filet inférieur ; liens de section visibles à partir de 1 024 px, menu replié en dessous. Les listes de faits et de canaux sont des rangées à filets horizontaux (`divide-y` + `border-y`), jamais des cartes. Pied de page à filet supérieur, 32 px de padding.

## Elevation & Depth

Le système est plat par tonalité : la profondeur vient du contraste canvas / surface et des filets d'un pixel, jamais d'une ombre au repos. Une seule ombre existe, `float`, et un seul élément la porte : le panneau du menu mobile, qui flotte au-dessus de la page. Les cartes, la figure de la chaîne, les boutons et les champs n'ont aucune ombre, ni au repos ni au survol. En sombre, l'ombre devient plus dense (alpha 0,8 / 0,6 sur un bleu très sombre) pour rester lisible sur le bleu nuit.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 16px 40px -16px rgb(29 29 31 / 0.22), 0 2px 8px -2px rgb(29 29 31 / 0.08)` ; sombre : `0 16px 40px -16px rgb(2 6 20 / 0.8), 0 2px 8px -2px rgb(2 6 20 / 0.6)`) : réservée aux surfaces qui flottent réellement au-dessus de la page (menu mobile). Pas de halo, pas de glow coloré.

### Named Rules
**The Inert Card Rule.** Une carte est inerte : aucune ombre, aucune translation, aucun changement de bordure au survol. Seuls les liens qu'elle contient réagissent.

**The One Float Rule.** `float` est la seule ombre du système ; elle n'apparaît que sur un élément positionné au-dessus du flux. Une ombre sur un élément dans le flux est une erreur.

## Shapes

Quatre rayons et un cercle, choisis par échelle de l'objet : 4 px pour les étiquettes de statut (`xs`), 6 px pour le lien de marque (`sm`), 10 px pour les boutons, filtres, champs et boutons icône (`md`), 16 px pour les cartes et la figure de la chaîne (`lg`). Les pastilles de techno, les points sémantiques, les repères et le point de signal de la chaîne sont des cercles pleins. Toute bordure est un filet d'un pixel en `line` ; les coins ne sont jamais coupés ni biseautés, aucune forme n'est détourée ou inclinée. Le focus clavier global est un contour de 2 px en accent, décalé de 3 px, à coins 2 px. Les icônes sont lucide à trait 1,5 px, 14 px (flèches sortantes), 16 px (dans les boutons et listes), 18 px (titres de compétences, bascule de thème), 20 px (menu) ; les logos GitHub et LinkedIn sont redessinés au même trait.

## Components

### Buttons
Un seul composant d'action pour tout le site (`ui/Button`) : lien si `href`, bouton sinon. Franc, plat, sans ombre.
- **Shape:** coins arrondis moyens (10 px) ; hauteur 44 px et padding horizontal 20 px en `md`, 36 px et 14 px en `sm` ; texte 15 px / 14 px graisse 500 ; icône 16 px à gauche avec un écart de 8 px.
- **Primary:** fond cobalt, texte blanc (bleu nuit en sombre). Un par écran : « Me contacter » dans la barre et le hero, « Envoyer » dans le formulaire.
- **Secondary:** fond surface, texte encre, filet d'un pixel en `line` ; au survol le filet passe en `line-strong`. LinkedIn, GitHub, « Copier l'adresse », Précédent / Suivant.
- **Ghost:** texte seul en encre secondaire, encre pleine au survol. Déclaré, non utilisé sur la page actuelle.
- **Hover / Focus:** transition 200 ms ease-out-quint sur fond, texte, bordure et transform ; enfoncement de 1 px à l'activation ; désactivé à 50 % d'opacité sans pointeur. Focus : contour global 2 px accent.
- **Filter toggle (Projets):** même géométrie que `sm` (36 px, 14 px de padding, 10 px de rayon). Repos : surface, filet, encre secondaire ; survol : filet `line-strong` à 40 %, encre pleine ; actif (`aria-pressed`) : fond encre, texte canvas, filet encre. C'est le seul endroit où l'encre sert de remplissage.
- **Icon buttons (chrome):** bascule de thème et menu, 36 × 36 px, coins 10 px, encre secondaire, survol sur `surface-2` et encre pleine ; icône seule avec `aria-label` et `title`. Exception limitée à la barre.

### Chips
Pastille de techno (`ui/ChipList`), l'unique forme de puce du site.
- **Style:** sans 13 px, line-height 1.3, encre pleine, fond canvas (lisible posé sur une carte), filet d'un pixel, coins pleins ; padding 4 px / 10 px ; écart 8 px dans une liste enveloppante.
- **State:** aucune interaction ; ce n'est pas un filtre.

### Tags
Étiquette de donnée (`ui/Tag`), réservée aux statuts, types et niveaux ; jamais au-dessus d'un titre.
- **Style:** Red Hat Mono 12 px, chiffres tabulaires, hauteur 24 px, padding 8 px, filet d'un pixel, coins 4 px, texte insécable.
- **Tones:** `neutral` (filet, encre secondaire, point `ink-3`), `ok` et `warn` (filet neutre, encre pleine, point vert / ambre de 6 px), `accent` (filet cobalt à 40 %, texte cobalt).

### Cards / Containers
La carte du site (`ui/Card`), inerte, utilisée pour expériences, projets, compétences et formation ; la figure de la chaîne partage exactement le même matériau.
- **Corner Style:** 16 px.
- **Background:** surface (blanc / bleu nuit #141e3a).
- **Shadow Strategy:** aucune ; voir The Inert Card Rule.
- **Border:** filet d'un pixel en `line`.
- **Internal Padding:** 24 px (28 px pour les cartes d'expérience, 32 px pour la chaîne à partir de 640 px). Les cartes projet et formation sont des colonnes flex avec un pied calé en bas (pastilles, catégorie, dépôts, ou période + tag).
- **Entrée:** grammaire Reveal, décalée de `index × 60 ms` dans une grille.

### Inputs / Fields
- **Style:** fond surface, bordure d'un pixel en `line-input` (plus sombre que le filet décoratif, ≥ 3:1 sur la surface), coins 10 px, texte 15 px en encre, placeholder en `ink-3`, padding horizontal 14 px ; hauteur 44 px pour les champs, textarea redimensionnable verticalement à padding 10 px et line-height 1.5. Libellé au-dessus en 14 px graisse 500, écart 6 px ; 20 px entre les champs.
- **Focus:** bordure cobalt + anneau de 2 px en cobalt à 25 %, transition 200 ms ; le contour natif est retiré au profit de cet anneau. Caret cobalt.
- **Error / Disabled:** aucun état visuel sur le champ ; l'erreur d'envoi est un texte 14 px en `danger` sous le bouton, le succès un texte en encre ; les deux dans une zone `aria-live`.

### Navigation
- **Style:** barre fixe 64 px, canvas à 85 % avec flou 12 px, filet inférieur ; logo hexagonal 28 px en accent + « Dan Levy » 16 px graisse 600 à -0,01 em ; liens 14 px espacés de 28 px ; bouton primaire `sm` et bascule de thème à droite.
- **Default / Hover / Active:** encre secondaire au repos, encre pleine au survol ; soulignement d'un pixel en encre qui se déploie depuis la gauche (scaleX 0 → 1, 300 ms ease-out-quint) au survol et reste déployé sur la section active (`aria-current`).
- **Mobile:** panneau sous la barre, fond canvas, filet supérieur, ombre `float`, liens 20 px graisse 500 sur 12 px de padding vertical ; fermeture au tap extérieur, à Échap et au clic sur un lien ; focus sur le premier lien à l'ouverture.
- **Skip link:** « Aller au contenu », visible au focus seulement, bouton cobalt à coins 10 px en haut à gauche.

### Section Header
Gabarit commun des sections (`ui/Section`) : filet d'en-tête qui se trace de gauche à droite (720 ms ease-out-quint) à l'arrivée dans le viewport, 24 px sous le filet, titre Headline seul. Jamais de chapeau, jamais de titre centré, jamais de carte englobante. La pagination qui suit une grille n'a pas de filet au-dessus.

### Production Chain (signature)
Figure à matériau de carte (16 px, filet, surface, padding 24 → 32 px) : titre 15 px graisse 600 et tag `ok` « En production » en tête. Six étapes en liste, chacune sur une grille 12 px + texte : repère de 11 px (cercle, filet, surface) qui s'allume en cobalt avec un œil intérieur de 2 px en surface ; rail vertical d'un pixel en `line` entre les repères ; libellé 15 px graisse 500 (lien avec flèche sortante 14 px qui glisse d'un pixel en diagonale et passe en cobalt au survol) ; détail en mono 12 px encre secondaire. Un point de signal de 7 px en cobalt descend le rail une fois au chargement : départ à 700 ms, 380 ms par étape (1 900 ms pour six), chaque repère s'allume à son passage en 320 ms. Sous `prefers-reduced-motion`, le point est posé sur le dernier repère et tous les repères sont allumés d'emblée.

### Reveal (motion grammar)
Une seule entrée pour tout le site (`ui/Reveal`) : opacité 0 → 1 et translation de 8 px vers le haut, 480 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, déclenchée à 8 % de marge avant l'entrée dans le viewport, décalée de `--reveal-delay` (0, 60, 120, 180, 240 ms dans le hero ; `index × 60 ms` dans les grilles). Sans JS ou sous `prefers-reduced-motion`, le contenu est visible d'emblée. Le nom et l'énoncé du hero n'entrent jamais en mouvement. Les transitions d'état (couleur, bordure, transform) durent 200 ms ; aucune transition n'accompagne le changement de thème.

## Do's and Don'ts

### Do:
- **Do** réserver le cobalt (#1a46e0 / #8fb1ff) aux actions, liens, icônes de titre, focus et point de signal ; un seul bouton primaire par écran.
- **Do** séparer par des filets d'un pixel en `line` (rangées `divide-y`, filets de section, bordures de carte), jamais par des aplats ni des ombres ; réserver `line-input` à la bordure au repos des champs de saisie.
- **Do** passer toute donnée (date, période, statut, version, pile technique) en Red Hat Mono 12 ou 13 px avec chiffres tabulaires, en graisse 400.
- **Do** composer sur douze colonnes à gouttière 48 px (7/5, 5/6) alignées à gauche, et replier en une colonne dans l'ordre du DOM sous 1 024 px.
- **Do** faire entrer les blocs avec la seule grammaire Reveal (480 ms, ease-out-quint, 60 ms d'écart) et tracer le filet d'en-tête ; couper tout mouvement sous `prefers-reduced-motion`.
- **Do** accompagner chaque icône de contenu d'un libellé textuel (enveloppe + « Me contacter », logo + « GitHub », icône + nom de famille de compétences).
- **Do** garder les deux modes à structure identique : seules les variables de `:root` / `.dark` changent, sans transition de thème ; le sombre reste bleu nuit.
- **Do** utiliser les trois tons sémantiques uniquement comme point de 6 px dans un tag (`ok`, `warn`) ou comme texte d'erreur (`danger`).

### Don't:
- **Don't** ajouter d'ombre, de translation ou de changement de bordure au survol d'une carte, d'une pastille ou de tout élément inerte ; `float` ne sort pas du menu mobile.
- **Don't** écrire de texte en dégradé, poser de fond en dégradé ni de halo lumineux (glow, blur coloré) ; le seul anneau autorisé est le focus de champ à 25 % de cobalt et le contour de focus de 2 px.
- **Don't** placer d'étiquette, de surtitre ou de ligne en capitales espacées au-dessus d'un titre h1–h3 ; le tag de statut se place à droite du titre, jamais au-dessus.
- **Don't** laisser une icône seule sans libellé dans le contenu ; les seules icônes nues sont les deux boutons de la barre (thème, menu), avec `aria-label` et `title`.
- **Don't** centrer un hero ni un titre de section ; pas de grille de cartes identiques à puces en guise de hero.
- **Don't** utiliser les graisses 300 ou 700, ni mettre une donnée mono en gras, ni une capitale espacée.
- **Don't** introduire une deuxième ombre, un deuxième accent ou un gris pur en mode sombre.
- **Don't** charger une police, un style ou une image depuis un domaine externe : la CSP de production (`font-src 'self'`, `style-src 'self'`, `img-src 'self' data:`) l'interdit.
