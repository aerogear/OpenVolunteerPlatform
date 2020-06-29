---
id: clientref
title: OVP client reference
---
# OpenVolunteer React Client and Admin

Example React Web application using AeroGear Open Volunteer Platform

## Getting Started

Requirements:

- Node.js 12.x or above to run server
- (optional) Keycloack server

### Running the Client in dev mode

1. Install Ionic
```shell
npm install -g @ionic/cli
```

1. Install dependencies
```shell
npm install
```
1. Start the app
```shell
npm run dev
```

### Adding keycloak integration to the client

Rename the `keycloak.example.json` to `keycloak.json` and update the fields
accordingly.
 
```js
{
  "realm": "<your realm>",
  "auth-server-url": "https://your-server/auth",
  "ssl-required": "none",
  "resource": "<your-client>",
  "public-client": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0
}
```

