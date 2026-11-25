DOCKER_COMPOSE_FILE=.docker/docker-compose.yml
PROJECT_NAME=portfolio
SERVICE_NAME=portfolio

.PHONY: build up down exec logs pull deploy

build:
	docker compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) build

up:
	docker compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) up -d

down:
	docker compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) down --remove-orphans

exec:
	docker exec -it $(SERVICE_NAME) /bin/sh

logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) logs -f

# Tire l'image GHCR de la version PORTFOLIO_TAG (latest par défaut) puis relance le conteneur.
pull:
	docker compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) pull

deploy: pull up
