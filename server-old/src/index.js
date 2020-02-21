const express = require('express')
const cors = require('cors')
const { VoyagerServer } = require('@aerogear/voyager-server')
const { KeycloakSecurityService } = require('@aerogear/voyager-keycloak')
const { createSubscriptionServer } = require('@aerogear/voyager-subscriptions')

const config = require('./config/config')
const connect = require('./db')
const { typeDefs, resolvers } = require('./schema')

process.on('unhandledRejection', error => {
  console.error(error.message, error.stack)
  process.exit(1)
})

async function start() {

  const app = express()
  app.use(cors())
  app.use('/', express.static('website'))
  app.get('/health', (req, res) => res.sendStatus(200))

  let keycloakService = null

  if (config.keycloakConfig) {
    keycloakService = new KeycloakSecurityService(config.keycloakConfig)
    keycloakService.applyAuthMiddleware(app)
  }

  const db = await connect(config.db)

  const apolloConfig = {
    typeDefs,
    resolvers,
    playground: config.playgroundConfig,
    introspection: true,
    context: {
      db
    }
  }

  const voyagerConfig = {
    securityService: keycloakService
  }

  const apolloServer = VoyagerServer(apolloConfig, voyagerConfig)

  apolloServer.applyMiddleware({ app })

  const server = app.listen(config.port, () => {
    createSubscriptionServer({
      securityService: keycloakService,
      schema: apolloServer.schema
    }, {
      path: '/graphql',
      server
    })
  })
}

start().then(() => {
  console.log(`\n    ***********************************************************
    🎮 Ionic PWA application available at http://localhost:${config.port}
    🚀 GraphQL Playground is available at http://localhost:${config.port}/graphql
    ***********************************************************`)
})
