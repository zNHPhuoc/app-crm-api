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

# exec app
app:
	docker exec -it nest_app bash
