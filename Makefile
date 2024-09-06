COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE = docker compose -f $(COMPOSE_FILE)

# Commands
.PHONY: build up down logs shell install docker docker-compose

build:
	@$(DOCKER_COMPOSE) build

up:
	@$(DOCKER_COMPOSE) up -d

down:
	@$(DOCKER_COMPOSE) down

logs:
	@$(DOCKER_COMPOSE) logs -f

shell:
	@$(DOCKER_COMPOSE) exec app sh

install:
	@echo "Installing Node.js dependencies..."
	@docker compose run --rm app npm install

ps:
	@$(DOCKER_COMPOSE) ps