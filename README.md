## Ionic 4 Apollo GraphQL Example

Sample application that integrates Ionic and Apollo GraphQL sever.

Implementation include:

- Ionic4 Angular frontent backed by Cordova/Capacitor for mobile deployment
- Apollo GraphQL Node.js server implementing sample `Tasks` API

## Aproach

Server side implements classical CRUD model on `Task` objects. 
Updates are being delivered using GraphQL subscriptions.

## Running example

Requirements:

- Docker
- Node.js 6.x or above

### Running the client

1.  Install this Ionic 4 starter app
```
npm install
```
3. Install Ionic
```
npm install -g ionic
```

3. Browse Ionic 4 app
```
npm run start
```

3. Run on Emulator
```
npm run ionic:android
```
### Running the server

Running server requires docker in order to run database

```
cd ./server
docker-compose up -d
npm install
npm run start
```

### Demo

![](./resources/screenshot.png)

### GraphQL tutorial

This repo is using GraphQL for communication between server and client.
To learn basics about GraphQL please follow tutorial:

https://www.javascripttuts.com/implementing-graphql-using-apollo-in-an-ionic-application-introduction/

### Ionic tutorial

This repo contains the code of an Ionic 4 starter app that we created as part of a *Getting started with Ionic 4 tutorial*. In the following tutorial your will learn the differences between Ionic 3 and Ionic 4 and all the new concepts about Ionic 4:

[Tutorial](https://ionicthemes.com/tutorials/about/ionic-4-vs-ionic-3)

Find more Ionic tutorials and starter apps in https://ionicthemes.com
