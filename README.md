# Portfolio - Dan Levy

Ce projet est le portfolio professionnel de Dan Levy, Développeur Back-end & DevOps. Il présente mon parcours, mes compétences techniques, ainsi que mes projets réalisés en entreprise et en formation.

C'est une application web moderne, rapide et responsive ("Mobile First"), conçue pour être facilement maintenable et extensible.

## 🚀 Technologies Utilisées

Ce projet repose sur une stack technique moderne et performante :

*   **[React 19](https://react.dev/)** : Bibliothèque JavaScript pour la construction de l'interface utilisateur.
*   **[TypeScript](https://www.typescriptlang.org/)** : Superset de JavaScript ajoutant un typage statique pour un code plus robuste et maintenable.
*   **[Vite](https://vitejs.dev/)** : Outil de build nouvelle génération, offrant un démarrage instantané et un HMR (Hot Module Replacement) ultra-rapide.
*   **[Tailwind CSS v4](https://tailwindcss.com/)** : Framework CSS utilitaire pour un design rapide, cohérent et responsive.
*   **[Lucide React](https://lucide.dev/)** : Bibliothèque d'icônes légère et cohérente.

## 🛠 Installation et Lancement

Pour lancer ce projet localement sur votre machine :

1.  **Cloner le dépôt :**
    ```bash
    git clone
    cd portfolio
    ```

2.  **Installer les dépendances :**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```
    L'application sera accessible à l'adresse indiquée dans le terminal (généralement `http://localhost:5173`).

4.  **Construire pour la production :**
    ```bash
    npm run build
    ```

## 📂 Architecture

Le projet a été structuré pour séparer clairement la logique, les données et la vue.

*   `src/data/` : Contient toutes les données textuelles (Expériences, Projets...). C'est ici qu'il faut aller pour modifier le contenu du site.
*   `src/components/` : Contient les composants React isolés (Hero, Navbar, etc.).
*   `src/types/` : Définit les types TypeScript pour garantir la cohérence des données.

Pour plus de détails techniques, consultez la [Documentation de l'Architecture](docs/ARCHITECTURE.md).

## ✨ Fonctionnalités

*   **Navigation Fluide** : Smooth scroll natif entre les sections.
*   **Filtrage Dynamique** : Tri des projets par catégorie (Pro, Perso, Formation) sans rechargement de page.
*   **Responsive Design** : Interface adaptée aux mobiles, tablettes et ordinateurs.
*   **Mode Sombre (Dark Mode)** : (Préparé via Tailwind, suit les préférences système par défaut).

## 🔒 CSP et hash du script JSON-LD

Le bloc `<script type="application/ld+json">` de `index.html` est autorisé dans la Content-Security-Policy (`.docker/000-default.conf`) via un hash `sha256-...`. Si ce bloc change, il faut recalculer le hash et mettre à jour la CSP.

Méthode recommandée : la console du navigateur affiche le hash exact attendu quand la CSP bloque le script (message d'erreur `Refused to execute inline script...`).

Alternative en ligne de commande :
```bash
node -e "
const fs = require('fs');
const crypto = require('crypto');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/);
const hash = crypto.createHash('sha256').update(match[1]).digest('base64');
console.log('sha256-' + hash);
"
```

---
© 2025 Dan Levy