<p align="center">
  <a href="#" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
 
# Description

CRM for managing customers, orders, and products.

# Quick Start

Clone this project

```shell
$ cp .env.example .env
```

cd to the project directory and run the following command to install the dependencies:

### Running the app with Docker
```bash
Generate a random keyfile for MongoDB replica set authentication

$ openssl rand -base64 756 > .docker/mongo/mongodb-keyfile

$ chmod 400 .docker/mongo/mongodb-keyfile
```
#### Build the Docker image
```bash
# install dependencies
$ make build

# run the app  
$ make up
```

## For local
- node:20-alpine
- nginx:alpine
- mongodb:6.0
- redis:alpine
- queue:alpine
- mailhog:latest

## Formatting
- Prettier
- ESLint

## Backend
- NestJS
- Redis

## Authentication
### Auth
- JWT
- Passport
- Passport JWT
- Passport Local

### Role
- Role Guard
- Role Decorator

### Permissions
- Permission Guard
- Permission Decorator

## Repository Pattern Architecture
- Controller → Define the routes and handle incoming requests.
- Service → Contains the business logic and interacts with the repository.
- Repository → Interacts with the database and performs CRUD operations.
- DTO → Data Transfer Object, used to define the structure of the data being sent and received.
- Entity → Represents the database table and its structure.
- Middleware → Intercepts requests and performs actions before they reach the controller.
- Decorator → Used to add metadata to classes and methods.
- Guard → Protects routes and checks for permissions.
- Interceptor → Intercepts requests and responses and performs actions before they are sent to the client.
- Exception Filter → Handles exceptions and errors and returns a response to the client.
