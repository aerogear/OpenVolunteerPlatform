## AeroGear Apollo Voyager Example app

Example application using Apollo GraphQL, Ionic and Cordova libraries

Implementation include:

- Ionic4 Angular frontend backed by Cordova/Capacitor for mobile deployment
- Apollo GraphQL Node.JS server implementing sample `Tasks` API

## Implementation

Server side implements classical CRUD model on `Task` objects. 
Updates are being delivered using GraphQL subscriptions.

### GraphQL Client

Application using [Voyager client](https://github.com/aerogear/aerogear-js-sdk/tree/master/packages/sync) to provide additional
offline capabilities on top of the Apollo GraphQL 


## Running example

Requirements:

- Docker
- Node.js 6.x or above

### Running the server

1. Start the postgres docker image

   ```shell
   cd ./server
   docker-compose up -d
   ```

1. Start the server

   ```shell
   npm install
   npm run start
   ```

### Running the client


1. Install Ionic

   ```shell
   npm install -g ionic
   ```

1. Install this Ionic 4 starter app

   ```shell
   npm install
   ```

1. Browse Ionic 4 app
   
   ```shell
   npm run start
   ```

1. Run on Emulator

   ```shell
   npm run ionic:android
   ```

### Demo

![](./resources/screenshot.png)
