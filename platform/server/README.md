# Open Volunteer Full Stack Server

Node.js implementation for GraphQL based API

## Integrations

- Graphback (Apollo GraphQL template)
- Keycloak (Authentication)
- AMQ Online (MQTT)
- MongoDB

## Usage

This project has been created using Graphback. 
Run the project using the following steps:

- Install

```sh
yarn install
```

- Start the Mongo database and MQTT client

```sh
docker-compose up -d
```

- Start the server

```sh
yarn start:server
```

## Docker Image

Server comes with docker file that can be used to build ready to use image.
Reference application is actively tracked and pushed to docker registry

`docker.io/wtrocki/openvolunteer`

Docker image supports following environment variables:

```
## MongoDB connection
MONGO_USER=user
MONGO_PASSWORD=password
MONGO_ADMIN_PASSWORD=password
MONGO_DATABASE=showcase
MONGO_HOST=

## MQTT with AMQ
MQTT_HOST=
MQTT_PORT=
MQTT_PASSWORD=
MQTT_USERNAME=
MQTT_PROTOCOL= 

# Hack to enable keycloak with self signed certs
# don't do it in production
NODE_TLS_REJECT_UNAUTHORIZED=0 

BACKUP_DEMO_DATA=true
USE_DEMO_DATA=false
```
### Running together with required services

Example docker-compose that can be used to launch OpenVolunter application

```yaml
version: '3'
services:
  server:
        image: wtrocki/openvolunteer
        environment:
            - MONGO_USER=user
            - MONGO_PASSWORD=password
            - MONGO_ADMIN_PASSWORD=password
            - MONGO_DATABASE=showcase
            - MONGO_HOST=
            - BACKUP_DEMO_DATA=false
            - USE_DEMO_DATA=true
  mongodb:
        image: centos/mongodb-34-centos7
        container_name: "mongodb"
        environment:
          - MONGODB_USER=user
          - MONGODB_PASSWORD=password
          - MONGODB_ADMIN_PASSWORD=password
          - MONGODB_DATABASE=showcase
        ports:
            - 27017:27017
  keycloak:
    image: jboss/keycloak:3.4.3.Final
    ports:
      - "8080:8080"
    environment:
      DB_VENDOR: h2
      KEYCLOAK_USER: ovp-admin
      KEYCLOAK_PASSWORD: ovp-admin
```

> NOTE: You need to execute `npm run keycloak:init` or import realm from ./integrations/keycloak/realm-export.json as in local machine to be able to use docker compose.

This command will create the following usernames:

```log
hzaub	
kudi
msash
tgers
tmaure
ukon
wtrocki
```

The password is the same as the username.

You can use these user names to login into the volunteer client application. 
