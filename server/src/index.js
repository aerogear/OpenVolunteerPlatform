const express = require('express')
const http = require('http')
const cors = require('cors')
const {
  SubscriptionServer,
  ExecutionParams,
  ConnectionContext
} = require('subscriptions-transport-ws');

const {
  VoyagerServer
} = require('@aerogear/voyager-server')
const {
  KeycloakSecurityService
} = require('@aerogear/voyager-keycloak')
const metrics = require('@aerogear/voyager-metrics')
const auditLogger = require('@aerogear/voyager-audit')
const {
  makeExecutableSchema
} = require('graphql-tools')
const config = require('./config/config')
const connect = require('./db')
const {
  typeDefs,
  resolvers
} = require('./schema')
const {
  execute,
  subscribe,
  GraphQLSchema
} = require('graphql')


let keycloakService = null

// if a keycloak config is present we create
// a keycloak service which will be passed into
// ApolloVoyagerServer
if (config.keycloakConfig) {
  keycloakService = new KeycloakSecurityService(config.keycloakConfig)
}

async function start() {

  const app = express()
  const httpServer = http.createServer(app)

  app.use(cors())
  metrics.applyMetricsMiddlewares(app, {
    path: '/metrics'
  })

  if (keycloakService) {
    keycloakService.applyAuthMiddleware(app)
  }

  app.get('/health', (req, res) => res.sendStatus(200))

  // connect to db
  const dataSource = {
    client: await connect(config.db),
    type: 'knex'
  }

  const apolloConfig = {
    typeDefs,
    resolvers,
    playground: config.playgroundConfig,
    context: async ({
      req
    }) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: dataSource.client,
      }
    }
  }

  const voyagerConfig = {
    securityService: keycloakService,
    metrics,
    auditLogger
  }

  const apolloServer = VoyagerServer(apolloConfig, voyagerConfig)


  apolloServer.applyMiddleware({
    app
  })
  //apolloServer.installSubscriptionHandlers(httpServer)
  httpServer.listen({
    port: config.port
  }, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}/graphql`)
    // applySubscriptions(httpServer, {path: '/graphql'}, apolloServer.schema)
    new SubscriptionServer({
      execute,
      subscribe,
      onConnect: async connectionParams => {
        console.log("ON SERVER TOKEN: ", connectionParams)
        return await keycloakService.validateToken(connectionParams)
      },
      schema: apolloServer.schema
    }, {
      server: httpServer,
      path: '/graphql'
    });
  })
}

start()