ENV_FILE=.env

build:
	docker compose --env-file $(ENV_FILE) build

up:
	docker compose --env-file $(ENV_FILE) up -d

down:
	docker compose down --remove-orphans

clean:
	docker compose down -v --remove-orphans

sh:
	docker exec -it nest_app sh

logs:
	docker compose logs -f

restart:
	@make down
	@make up

# exec app
app:
	docker exec -it nest_app bash

yarn-dev:
	docker exec -it nest_app yarn start:dev

# exec mongo
mongo:
	docker exec -it nest_mongo bash

mongo-shell:
	docker exec -it nest_mongo mongosh -u root -p secret123 --authenticationDatabase admin
