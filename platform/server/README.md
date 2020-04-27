# DataSync Full Stack Server

Node.js template using Graphback

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

- Generate resources(schema and resolvers) and create database

```sh
yarn graphback generate
```

- Start the server

```sh
yarn start:server
```
