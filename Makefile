DOCKER_COMPOSE_FILE=.docker/docker-compose.yml
PROJECT_NAME=portfolio
SERVICE_NAME=portfolio

.PHONY: build up down exec logs

build:
	docker-compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) build

up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) up -d

down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) down

exec:
	docker exec -it $(SERVICE_NAME) /bin/sh

logs:
	docker-compose -f $(DOCKER_COMPOSE_FILE) -p $(PROJECT_NAME) logs -f