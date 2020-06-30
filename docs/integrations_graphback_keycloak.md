---
id: keycloak-authz
title: Out of the box Keycloak based authentication
sidebar_label: Keycloak Auth
---

## Authorization using Keycloak

Graphback Keycloak Authz enables [Keycloak](https://www.keycloak.org/) integration in [Graphback](https://graphback.dev) based applications. This enables you to declaratively add authorization capabilities like role based access on top of the CRUD model that is used within the Open Volunteer Platform.


Under the hood, Open Volunteer authorization is designed to work with [`keycloak-connect`](https://www.npmjs.com/package/keycloak-connect) and [`keycloak-connect-graphql`](https://www.npmjs.com/package/keycloak-connect-graphql). `keycloak-connect` is the official Keycloak middleware for Express applications. `keycloak-connect-graphql` provides deeper Keycloak integration into GraphQL servers.


## Customization


Open Volunteer Platform provides out of the box Keycloak integration. 

The authorization rules in place are defined in [`server/src/config/auth.ts`](../platform/server/src/config/auth.ts). The initial configurations looks like below:

```ts
export const authConfig: CrudServicesAuthConfig = {
  DistributionCentre: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
  Volunteer: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: [] },
    delete: { roles: ['admin'] },
  },
  Recipient: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
  VolunteerAction: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
  VolunteerActionProduct: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
}
```

With this configuration the following rules are in place.

- Only Admin users can create, update and delete entities, and all users can read them.


You modify this file to add additional rules when you new business models are added or if you need to modify custom existing rules.

