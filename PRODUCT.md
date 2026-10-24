# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Utilisateur principal : recruteurs techniques, tech leads, CTO et responsables d'équipes infra ou back-end qui évaluent Dan Levy pour un poste DevOps / SRE / back-end. Ils arrivent depuis LinkedIn, un CV ou GitHub, souvent sur mobile et entre deux rendez-vous, avec une à trois minutes d'attention. Leur job : vérifier le niveau, la cohérence du parcours et la réalité des projets, puis décider de prendre contact.

Audience secondaire, non confirmée : pairs développeurs et communauté auto-hébergement arrivant par GitHub. Aucune promesse de prestation freelance n'est engagée.

## Product Purpose

Site vitrine personnel (CV en ligne) de Dan Levy, développeur back-end & DevOps, hébergé sur dlyhub.com. Il présente Dan de façon professionnelle et crédible et déclenche une prise de contact. Succès : un visiteur comprend en quelques secondes qui est Dan, ce qu'il sait faire et pourquoi c'est sérieux, puis le contacte (formulaire, email ou LinkedIn).

## Positioning

Développeur back-end PHP/Symfony devenu DevOps par la pratique : il exploite réellement sa propre infrastructure (services conteneurisés derrière un reverse proxy, TLS, monitoring Prometheus/Grafana/Datadog, CI/CD avec workflows GitHub réutilisables, pipelines de sécurité Trivy/Gitleaks/ZAP). Le portfolio lui-même est une preuve : conteneurisé, servi par un Apache durci avec CSP stricte, scanné en CI. Parcours en alternance de 2021 à 2026 chez trois employeurs, puis CDI chez Meilleurtaux Placement depuis septembre 2026. Bac+5 Architecte des Systèmes d'Information (CFA INSTA).

## Operating Context

- Lecture sur mobile et desktop, depuis LinkedIn, GitHub ou un CV, par des gens pressés.
- Langue : français uniquement (`lang="fr"`), audience France.
- Contact : formulaire qui envoie un POST JSON `{ from, subject, html }` vers l'API mailer externe `VITE_MAILER_URL` ; repli `mailto:danlevy149@gmail.com` avec copie de l'adresse ; liens GitHub (Skuskusku13) et LinkedIn.
- Thème clair / sombre : préférence système, bascule manuelle persistée dans `localStorage`, favicon adapté au thème.

## Capabilities and Constraints

- SPA React 19 + TypeScript + Vite 8 + Tailwind CSS v4, icônes lucide-react. Page unique avec ancres (`#about`, `#experiences`, `#projects`, `#skills`, `#education`, `#contact`), pas de routing.
- Contenu centralisé dans `src/data/index.ts`, typé par `src/types/index.ts` : 3 expériences, 3 formations, 9 familles de compétences, 12 projets (catégories pro / perso / formation, statut, liens GitHub optionnels). Ce fichier reste la source de vérité du contenu.
- Build statique servi par Apache (`httpd:2.4-alpine`) derrière un reverse proxy, CSP stricte dans `.docker/000-default.conf` : toute ressource externe (polices, scripts, images) doit être auto-hébergée ou validée contre la CSP.
- SEO à préserver : meta, Open Graph, Twitter card, JSON-LD Person, sitemap, manifest.
- Aucune photo portrait, aucun CV PDF : le design ne doit pas en supposer l'existence.
- Textes : réécriture libre autorisée, faits inchangés (dates, employeurs, technologies, diplômes, statuts). La description du projet « Portfolio & Portail » doit être corrigée : le portail IP a été retiré du site.
- Décision ouverte : audience freelance non confirmée, aucune offre de prestation à afficher.

## Brand Commitments

- Nom : Dan Levy. Titre : Développeur Back-end & DevOps.
- Logo hexagonal « D » (`src/assets/logo-light.svg`, `logo-dark.svg`, favicons dérivés dans `public/`) : conservé, engagement ferme. Sa forme est fixe ; sa couleur peut suivre la nouvelle palette.
- Mode clair et mode sombre avec bascule : conservés, engagement ferme.
- Palette bleue actuelle (#2563eb clair, #06b6d4 sombre) : non verrouillée, remplaçable.
- Voix : professionnelle, directe, sans survente ni jargon marketing.

## Evidence on Hand

- Expériences réelles : Meilleurtaux Placement (janv. 2024 → aujourd'hui, alternance puis CDI sept. 2026), Storyzy (sept. 2023 → janv. 2024), SESAN (oct. 2021 → août 2023).
- Dépôts publics : portfolio, workflows-reusable, backoffice-django, backoffice, bateau-shajudan, SpringAngularRest, bunker_webapp, bunker_API, pokedex-android, nosdeputes-android, pokemon_model_ia.
- Infrastructure réelle en production : dlyhub.com (reverse proxy, services conteneurisés, TLS, Cloudflared), CI sécurité (npm audit, Trivy, Gitleaks, ZAP baseline).
- Formations : CFA INSTA, Bac+2 BTS SIO SLAM, Bac+3 CDA, Bac+5 Architecte des Systèmes d'Information.
- Absences à ne pas inventer : pas de témoignages, pas de chiffres d'impact, pas de clients nommés, pas de photo, pas de CV PDF, pas de certifications.

## Product Principles

1. Preuve avant promesse : montrer l'infrastructure, les pipelines et les dépôts plutôt que des adjectifs.
2. Lisible en trente secondes : un recruteur pressé saisit le profil, le niveau et le parcours sans long défilement.
3. Contact à portée de main : l'action de contact reste visible à chaque étape du parcours.
4. Exactitude : chaque fait affiché est vérifiable (dates, employeurs, technologies, diplômes).
5. Le site est lui-même un livrable DevOps : performance, accessibilité et sécurité (CSP) sont des arguments, pas des contraintes.

## Accessibility & Inclusion

Aucune exigence formelle établie. Standard visé par défaut : WCAG 2.2 AA (contraste, focus visible, navigation clavier, respect de `prefers-reduced-motion`).
