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
const { subscriptionServer } = require('./subscriptions')



const { appTypeDefs, appResolvers } = require('./schema')
const connect = require("./db")

const config = require('./config/config')

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

  const { applyFileMiddelware } = require('./files');
  applyFileMiddelware(app);
  app.get('/health', (req, res) => res.sendStatus(200))

  // connect to db
   const client = await connect(config.db);

  const apolloConfig = {
    typeDefs: appTypeDefs,
    resolvers: appResolvers,
    playground: config.playgroundConfig,
    context: async ({
      req
    }) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: client,
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
   subscriptionServer(keycloakService, httpServer, apolloServer)
  })
}

start()
