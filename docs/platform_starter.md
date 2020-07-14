# OpenVolunteerPlatform Starter

This project contains reference implementation for 
volunteer and admin application.

## Project structure

- Volunteer Client application `/client`
- Admin application `/client-admin`
- Server application `/server`
- Data model representing system api `./server/model`
- OpenShift deployment `./.openshift`

## Getting Started

Requirements:

- Docker and docker-compose
- https://nodejs.org/en/download/ (Node.js 12.x or above)
- (optional) access to a running OpenShift instance

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

5. Links to applications should be printed in console.
```shell
    🎮 Ionic PWA application available at http://localhost:4000
    🎮 Admin PWA application available at http://localhost:4000/admin
```

Volunteer accounts for logging to voulnteer app that can be used:

```log
hzaub	
kudi
msash
tgers
tmaure
ukon
wtrocki
```

Admin application user:

`ovp-admin`

Volunteers can register to the application in login screen


### Technical details

#### Keycloak integration

Follow these instructions to set up Keycloak for Authentication/Authorization.

1. Configure the Keycloak Server
+
```shell
cd ./server
yarn keycloak:init
```

This command creates the necessary resources in Keycloak and prints instructions *you must follow to enable the integration.* 

Follow the instructions and copy the JSON configurations to the appropriate locations.
The  Starter app and server will read these configurations and the integration will be enabled when they are started.

### Running clients as Mobile Applications

#### For IOS
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

When running locally you will need to also enable http traffic. 
For example for android add `android:usesCleartextTraffic#"true"` to AndroidManifest.xml

Project should stard in IDE and can be launched as any other native application

## Using MQTT for GraphQL subscriptions

By default platform will use in memory subscription mechanism that is not 
recomended to production. For OpenShift deployment we are using AMQ MQTT protocol. On local machine this can be configured using following steps.

1. Go to server/scripts ./mqtt
2. Execute docker-compose up
3. Set MQTT_HOST environment variable in .env file

MQTT_HOST#127.0.0.1

### Running On OpenShift

Please check link:./.openshift[.openshift] folder for more information.

## Development 

Starter template is basing on https://graphback.dev open source project.
Please follow Getting Started guide for Graphback to learn how to modify OpenVolunteer platform:

https://graphback.dev/docs/intro/datamodel

### Executing Graphback source generator

The below command will generate client side queries, mutations for the client side

```sh
yarn generate:all
```
