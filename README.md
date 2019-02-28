## AeroGear Showcase Application

Example application using AeroGear Mobile Services. 

## Implementation

Implementation includes:

- Integration with AeroGear Mobile Services
- Ionic 4 Angular frontend backed by Cordova
- A Node.js GraphQL Server that implements a sample `Tasks`

### GraphQL Client

The mobile application uses [Voyager Client](https://github.com/aerogear/aerogear-js-sdk/tree/master/packages/sync) to provide additional offline capabilities on top of Apollo GraphQL. 

### GraphQL Server

The GraphQL server uses [Voyager Server](https://github.com/aerogear/voyager-server) to provide GraphQL capabilities along with security, monitoring and tools to simplify GraphQL API development.

## Getting Started

Requirements:

- Docker
- Node.js 6.x or above to run server
- (optional) access to a running OpenShift instance

### Running the server

1. Start the PostgreSQL container

```shell
cd ./server
docker-compose up -d
```

1. Start the server

```shell
npm install
npm run start
```

NOTE: If Keycloak integration is enabled on the server, and the Keycloak server is running using self-signed certificate, please make sure set this environment variable before running the server:

```shell
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

### (optional) Running the Server on OpenShift

1. Log into your OpenShift instance with the `oc login` command.
1. Deploy the Server with PostgreSQL

```shell
oc new-app -f server/openshift-template.yml
```

1. To deprovision all of the resources from the template, run

```shell
oc delete all -l app=ionic-showcase-server \
&& oc delete secret -l app=ionic-showcase-server \
&& oc delete pvc -l app=ionic-showcase-server
```

### Running the Client

1. Install Ionic 4

```shell
npm install -g ionic@4
```

1. Install dependencies

```shell
npm install
```

1. Browse Ionic 4 app
   
```shell
npm run start
```

1. Alternatively - Run as a mobile application in the Android emulator.

```shell
npm run ionic:android
```

> NOTE: To connect to the local GraphQL server, when the app is running in the Android emulator,
please change [Client URL](https://github.com/aerogear/apollo-voyager-ionic-example/blob/master/src/app/services/voyager.service.ts#L42) from `localhost` to `10.0.2.2` 

### OpenShift Integration

To integrate with OpenShift mobile config please paste your configuration into
[mobile-services.js](./src/mobile-services.js) file
