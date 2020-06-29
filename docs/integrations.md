---
id: integrations
title: Integrations
sidebar_label: Integrations
---

## Integrations

## Prerequisites

- There is a Keycloak service available.
- You must first create a client for your application in the Keycloak Administration Console, and then click on the `Installation` tab, select `Keycloak OIDC JSON` for `Format` Option, and then click on `Download`. Save the downloaded `keycloak.json` file to your project.

## Setting Up Keycloak Protection in the Voyager Framework

1. Import Voyager Keycloak module
    ```javascript
    const { KeycloakSecurityService } = require('../../packages/voyager-keycloak')
    ```
2. Read the Keycloak config and pass it to initialise the `KeycloakSecurityService`.
    ```javascript
    const keycloakConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, './path/to/keycloak.json')))
    const keycloakService = new KeycloakSecurityService(keycloakConfig)
    ```
3. Use the `keycloakService` instance to protect your app:
    ```javascript
    const app = express()
    keycloakService.applyAuthMiddleware(app)
    ```
4. The last piece of work to do is telling Voyager server that the `keycloakService` above will be used as the security service:
    ```javascript
    const voyagerConfig = {
      securityService: keycloakService
    }
    const server = VoyagerServer(apolloConfig, voyagerConfig)
    ```

The [Keycloak Example Server Guide](https://github.com/aerogear/voyager-server/blob/master/doc/guides/examples.md#keycloak-example) has an example server based off the instructions above and shows all of the steps needed to get it running.

## Use the `@hasRole` Directive On Your Schema

The Voyager Keycloak module provides the `@hasRole` directive to define role based authorisation in your schema. The `@hasRole` directive is a special annotation that can be applied to

* Fields
* Queries
* Mutations
* Subscriptions

The `@hasRole` usage is as follows:

* `@hasRole(role: String)`
  * Example - `@hasRole(role: "admin"])`
  * If the authenticated user has the role `admin` they will be authorized.
* `@hasRole(role: [String])`
  * Example - `@hasRole(role: ["admin", "editor"])`
  * If the authenticated user has **at least one of the roles** in the list, they will be authorized.

**The default behaviour is to check client roles.** For example, `@hasRole(role: "admin"])` will check that user has a client role called `admin`. `@hasRole(role: "realm:admin"])` will check if that user has a realm role called `admin` 

The syntax for checking a realm role is `@hasRole(role: "realm:<role>")`. For example, `@hasRole(role: "realm:admin")`. Using a list of roles, it is possible to check for both client and realm roles at the same time.

### Example: Using the @hasRole Directive to Apply Role Based Authorization on a Schema

The following example demonstrates how the `@hasRole` directive can be used to define role based authorization on various parts of a GraphQL schema. This example schema represents publishing application like a news or blog website.

```
type Post {
  id: ID!
  title: String!
  author: Author!
  content: String!
  createdAt: Int!
}

type Author {
  id: ID!
  name: String!
  posts: [Post]!
  address: String! @hasRole(role: "admin")
  age: Int! @hasRole(role: "admin")
}

type Query {
  allPosts:[Post]!
  getAuthor(id: ID!):Author!
}

type Mutation {
  editPost:[Post]! @hasRole(role: ["editor", "admin"])
  deletePost(id: ID!):[Post] @hasRole(role: "admin")
}
```

There are two types:

* `Post` - This might be an article or a blog post
* `Author` - This would represent the person that authored a Post

There are two Queries:

* `allPosts` - This might return a list of posts
* `getAuthor` - This would return details about an Author

There are two Mutations:

* `editPost` - This would edit an existing post
* `deletePost` - This would delete a post.

#### Role Based Authorization on Queries and Mutations

In the example schema, the `@hasRole` directive has been applied to the `editPost` and `deletePost` mutations. The same could be done on Queries.

* Only users with the roles `editor` and/or `admin` are allowed to perform the `editPost` mutation.
* Only users with the role `admin` are allowed to perform the `deletePost` mutation.

This example shows how the `@hasRole` directive can be used on various queries and mutations.

### Role Based Authorization on Fields

In the example schema, the `Author` type has the fields `address` and `age` which both have `hasRole(role: "admin")` applied. 

This means that users without the role `admin` are not authorized to request these fields **in any query or mutation**.

For example, non admin users are allowed to run the `getAuthor` query, but they cannot request back the `address` or `age` fields.
