# Architecture du Projet Portfolio

Ce document explique les choix architecturaux et la structure du code de l'application Portfolio.

## 🏗 Structure Globale

L'application suit une architecture modulaire basée sur React. L'objectif est de séparer clairement la logique, les données et la présentation pour faciliter la maintenance.

```text
src/
├── components/   # Composants d'interface (UI)
├── data/         # Données statiques (le contenu du site)
├── types/        # Définitions TypeScript (Contrats de données)
├── App.tsx       # Composant racine (Assemblage)
├── main.tsx      # Point d'entrée de l'application
└── index.css     # Styles globaux & Configuration Tailwind
```

## 🧩 Détail des Dossiers

### 1. `src/types/`
C'est le point de départ de la robustesse de l'application. Nous définissons ici les "contrats" que nos données doivent respecter.
*   **Objectif** : Assurer que si on ajoute une expérience ou un projet, on n'oublie aucun champ obligatoire.
*   **Fichier clé** : `index.ts` (exporte les interfaces `Experience`, `Project`, etc.).

### 2. `src/data/`
Ce dossier agit comme une "base de données" statique.
*   **Objectif** : Séparer le **contenu** du **code**. Pour modifier un texte, ajouter une formation ou changer une date, on ne touche *jamais* aux composants React. On modifie uniquement ce fichier.
*   **Avantage** : Rend le site maintenable même par quelqu'un qui ne connaît pas React.

### 3. `src/components/`
Contient les briques visuelles de l'application.
*   **Philosophie** : Les composants doivent être le plus "bêtes" possible. Ils reçoivent des données (ou les importent) et se contentent de les afficher.
*   **Composants clés** :
    *   `Navbar` : Gère sa propre logique d'ouverture/fermeture (menu mobile).
    *   `Projects` : Contient une petite logique interne pour filtrer les projets par catégorie.

### 4. Styles (Tailwind CSS)
Nous utilisons **Tailwind CSS v4** via le plugin Vite.
*   La configuration est minimale (directement dans CSS/Vite).
*   Le "Smooth Scroll" est géré nativement via CSS dans `index.css`.

## 🔄 Flux de Données

1.  Les données sont définies en dur dans `src/data/index.ts`.
2.  Elles sont typées par `src/types/index.ts`.
3.  Les composants (`components/`) importent ces données directement.
4.  `App.tsx` assemble ces composants pour former la page unique.
