# Subscriptions

To set up subscriptions in voyager server, these steps must be followed.

* Configure SubscriptionServer using voyager-subscriptions
* Configure a Publish Subscribe Mechanism
* Define Subscriptions in the Schema and Implement Subscription Resolvers

## Configure SubscriptionServer using voyager-subscriptions

A typical Voyager Server setup without subscriptions is shown below.

```js
const apolloServer = VoyagerServer({
  typeDefs,
  resolvers
})

const app = express()
apolloServer.applyMiddleware({ app })

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
)
```

`@aerogear/voyager-subscriptions` simplifies the setup of subscriptions and provides integrations with other Voyager packages such as `@aerogear/voyager-keycloak`.

To set up subscriptions using `@aerogear/voyager-subscriptions`, an additional step is needed.

```js
const { createSubscriptionServer } = require('@aerogear/voyager-subscriptions')

const apolloServer = VoyagerServer({
  typeDefs,
  resolvers
})

const app = express()
apolloServer.applyMiddleware({ app })

const server = app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)

  createSubscriptionServer({ schema: apolloServer.schema }, {
    server,
    path: '/graphql'
  })
)
```

`createSubscriptionServer` installs handlers for managing websocket connections and delivering subscriptions on our server. 

It is a thin wrapper around `SubscriptionServer` from the popular [subscriptions-transport-ws](https://npm.im/subscriptions-transport-ws) module that provides integrations with other voyager modules such as `@aerogear/voyager-keycloak`. `createSubscriptionServer` returns a `SubscriptionServer` instance and it supports all of the same arguments and options.

## Configure a Publish Subscribe Mechanism

Subscriptions depend on a [publish subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) mechanism to generate the events that notify a subscription. There are [several `PubSub` implementations](https://www.apollographql.com/docs/apollo-server/features/subscriptions/#pubsub-implementations) available based on the `PubSubEngine` interface.

```js
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()
```

This example uses the default `PubSub` provided by `apollo-server`. This is an in memory implementation which is useful for prototyping but not suitable for production. We recommend using our [MQTT PubSub](npm.im/@aerogear/graphql-mqtt-subscriptions) in production.

# Define Subscriptions in the Schema and Implement Subscription Resolvers

Subscriptions are a root level type. They are defined in the schema similar to `Query` and `Mutation`.

```
type Subscription {
  taskCreated: Task
}

type Mutation {
  createTask(title: String!, description: String!): Task
}

type Task {
  id: ID!
  title: String!
  description: String!
}
```

Inside our resolver map we add a Subscription resolver that returns an `AsyncIterator,` which listens for events.
To generate an event, we can use the `publish` method on our `pubsub` implementation. `pubsub.publish` can be called anywhere but it is usually called inside a Mutation resolver. Example: generate an event when a new item was created.

```js
const TASK_CREATED = 'TaskCreated'

const resolvers = {
  Subscription: {
    taskCreated: {
      subscribe: () => pubSub.asyncIterator(TASK_CREATED)
    }
  },
  Mutation: {
    createTask: async (obj, args, context, info) => {
      const task = tasks.create(args)
      pubSub.publish(TASK_CREATED, { taskCreated: task })
      return task
    }
  },
}
```

# GraphQL MQTT PubSub Setup

This section specifically describes how to set up an MQTT `PubSub` for powering GraphQL subscriptions. For more generic information about PubSub mechanisms, read [Configure a Publish Subscribe Mechanism](#configure-a-publish-subscribe-mechanism).

The [`@aerogear/graphql-mqtt-subscriptions`](https://npm.im/@aerogear/graphql-mqtt-subscriptions) module provides an `AsyncIterator` interface used for [implementing subscription resolvers](#define-subscriptions-in-the-schema-and-implement-subscription-resolvers) It allows you to connect our GraphQL server to an MQTT broker to support horizontally scalable subscriptions.

## Procedure

* Initialize an MQTT client and pass it into this module.
* This module provides the `PubSub` interface used to implement subscriptions.

```js
const mqtt = require('mqtt')
const { MQTTPubSub } = require('@aerogear/graphql-mqtt-subscriptions')

const client = mqtt.connect('mqtt://test.mosquitto.org', {
  reconnectPeriod: 1000,
})

const pubsub = new MQTTPubSub({
  client
})
```

In the example, an mqtt client is created using `mqtt.connect` and then this client is passed into an `MQTTPubSub` instance. This `pubsub` can now be used to publish and to subscribe to events in your GraphQL server.

### Recommended Resources

* Read the [documentation for `mqtt.connect`](https://www.npmjs.com/package/mqtt#connect).
* Read the [documentation for MQTTPubSub](https://npmjs.com/package/@aerogear/graphql-mqtt-subscriptions)
