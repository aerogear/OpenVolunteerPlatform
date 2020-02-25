# Showcase Graphback Full Stack Server

Starter Full Stack template using Graphback

## Usage

This project has been created using Graphback. Run the project using the following steps:

- Install

```sh
yarn install
```

- Start the Postgress database

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
