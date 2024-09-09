COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE = docker compose -f $(COMPOSE_FILE)
DOCKER = docker
SERVICE = backend
MIGRATION_CMD = npm run migration:run
SEED_CMD = npm run seed
DOCKER_BUILD_OPTS = --no-cache

# Commands
.PHONY: build up down logs shell install docker docker-compose

# Target to run migrations with a new instance of the container
migrate-run:
	$(DOCKER_COMPOSE) run --rm $(SERVICE) $(MIGRATION_CMD)

seed-run:
	$(DOCKER_COMPOSE) run --rm $(SERVICE) $(SEED_CMD)

build:
	@$(DOCKER_COMPOSE) build

build-no-cache:
	@$(DOCKER_COMPOSE) build $(DOCKER_BUILD_OPTS)	

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

clean-containers:
	@$(DOCKER) rm -f $$(docker ps -aq)
	@echo "Containers successfully removed..."

ps:
	@$(DOCKER_COMPOSE) ps