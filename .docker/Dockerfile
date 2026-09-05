# Étape 1 : Build de l'application React + Vite
FROM node:22-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# npm clean install, sans rapport d'audit : l'endpoint d'audit npm est lent/instable,
# les vulnérabilités sont couvertes par Trivy en CI.
RUN npm ci --no-audit --no-fund

# Copier le code source (voir .dockerignore : .env*, node_modules, dist, .git exclus)
COPY . .

# URL publique de l'API de contact (portfolio-back). Vite l'inline dans le bundle
# envoyé aux navigateurs : c'est une valeur publique par nature, pas un secret,
# d'où le défaut prod ici. Surcharge : --build-arg VITE_MAILER_URL=... ou
# build.args dans .docker/docker-compose.yml. Aucun .env n'est nécessaire au build.
# Déclaré après COPY pour que changer l'URL n'invalide pas le cache de npm ci.
ARG VITE_MAILER_URL=https://back.dlyhub.com/api/contact
ENV VITE_MAILER_URL=$VITE_MAILER_URL

# Refuser un build sans URL : un bundle avec fetch(void 0) a déjà été déployé en prod,
# le formulaire postait vers /undefined et affichait un faux succès.
RUN test -n "$VITE_MAILER_URL" || { echo "ERREUR : VITE_MAILER_URL est vide" >&2; exit 1; }

# Build de production
RUN npm run build

# Vérifier que Vite a bien inliné l'URL dans le bundle
RUN grep -rq -- "$VITE_MAILER_URL" dist/assets/ || { echo "ERREUR : VITE_MAILER_URL absente du bundle" >&2; exit 1; }

# Étape 2 : Servir avec Apache (IMAGE FINALE DE PRODUCTION)
FROM httpd:2.4-alpine

WORKDIR /usr/local/apache2/htdocs/

# Copier la configuration du VirtualHost
COPY ./.docker/000-default.conf /usr/local/apache2/conf/extra/000-default.conf

# Configurer Apache
RUN echo "Include /usr/local/apache2/conf/extra/000-default.conf" >> /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule headers_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copier UNIQUEMENT les fichiers buildés (production)
COPY --from=builder /app/dist /usr/local/apache2/htdocs/
