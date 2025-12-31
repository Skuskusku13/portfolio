# Étape 1 : Build de l'application React + Vite
FROM node:22-alpine AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

#npm clean install
RUN npm ci

# Copier le code source
COPY . .

# Build de production
RUN npm run build

# Étape 2 : Servir avec Apache (IMAGE FINALE DE PRODUCTION)
FROM httpd:2.4-alpine

WORKDIR /usr/local/apache2/htdocs/

# Copier la configuration du VirtualHost
COPY ./.docker/000-default.conf /usr/local/apache2/conf/extra/000-default.conf

# Configurer Apache
RUN echo "Include /usr/local/apache2/conf/extra/000-default.conf" >> /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copier UNIQUEMENT les fichiers buildés (production)
COPY --from=builder /app/dist /usr/local/apache2/htdocs/