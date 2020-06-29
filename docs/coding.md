---
id: coding
title: OVP reference development
---

# OpenVolunteerPlatform Server Starter

## Project Structure
- Volunteer Client Application `/client`
- Admin Application `/client-admin`
- Server Application `/server`
- Data Model Representing System API `./model`
- OpenShift Deployment `./.openshift`

## Getting Started
* [Running Apps and Server](Running-Apps-and-Server)
* [Technical Details](Technical-Details)
* [Running Clients as Mobile Applications](Running-Clients-as-Mobile-Applications)
* [Using MQTT for GraphQL subscriptions](Using-MQTT-for-GraphQL-Subscriptions)
* [Development](Development) 

**Requirements:**
- [Node.js 12.x](https://nodejs.org/en/download/) or later version
- Docker and Docker Compose
- Access to a running OpenShift instance (_Optional_)

### Running Apps and Server

1. Install yarn and project dependencies
```shell
npm install -g yarn
yarn
```
2. Build client admin and client 
```shell
yarn
yarn prepare:all
```
3. Start the server
```shell
cd ./server
docker-compose up -d
## Wait at least minute for containers to start
yarn keycloak:init
yarn start
```
4. Links to applications should be printed in the console.
```shell
    🎮 Ionic PWA application available at http://localhost:4000
    🎮 Admin PWA application available at http://localhost:4000/admin
```

By default, the two users that can log into the application are created:
- username: `developer`; password: `developer`
- username: `admin`; password: `admin`

Volunteers can register to the application in the login screen. 


### Technical Details

#### Keycloak Integration

Follow these instructions to set up Keycloak for Authentication/Authorization.

1. Configure the Keycloak Server

```shell
cd ./server
yarn keycloak:init
```
This command creates the necessary resources in Keycloak and prints instructions you must follow to enable the integration.

2. Follow the printed instructions and copy the JSON configurations to the appropriate locations.
The Starter app and server will read these configurations and the integration will be enabled when they are started.
By default, the two users that can log into the application are created:

- username: `developer`, password: `developer`
- username: `admin`, password: `admin`


### Running Clients as Mobile Applications

#### For IOS:
```
cd ./client
yarn cap add ios
yarn run:ios
```

#### For Android:
```
cd ./client
yarn cap add android
yarn run:android
```

When running locally you will need to also enable HTTP traffic. 
For example, for Android add `android:usesCleartextTraffic#"true"` to AndroidManifest.xml

The project should start in IDE and can be launched as any other native application.

## Using MQTT for GraphQL Subscriptions

By default, the platform uses an in memory subscription mechanism that is not 
recomended for production. For OpenShift deployment, the AMQ MQTT protocol is used. On local machine this can be configured using the following steps:

1. Go to server/scripts ./mqtt
2. Execute docker-compose upS
3. Set MQTT_HOST enviedmen thet variable in .env file

MQTT_HOST#127.0.0.1

### Running On OpenShift

Please check link:./.openshift[.openshift] folder for more information.

## Development 

The Starter template is based on the [Graphback](https://graphback.dev) open source project. Please follow the Graphback [Getting Started Guide](https://graphback.dev/docs/intro/datamodel) to learn how to modify the Open Volunteer Platform.

### Executing Graphback source generator

The  following command generates client side queries and mutations for the client side:

```sh
yarn generate:all
```
