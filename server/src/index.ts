import cors from 'cors';
import express from 'express';

import { KeycloakSecurityService } from '@aerogear/voyager-keycloak'
import { createSubscriptionServer } from '@aerogear/voyager-subscriptions'
import { VoyagerServer } from '@aerogear/voyager-server'

import { config } from './config/config'

import { createApolloServer } from './graphql';

async function start() {
  const app = express();

  app.use(cors());
  app.use('/', express.static('website'))
  app.get('/health', (req, res) => res.sendStatus(200));

  let keycloakService;

  if (config.keycloakConfig) {
    keycloakService = new KeycloakSecurityService(config.keycloakConfig)
    keycloakService.applyAuthMiddleware(app)
  }

  const apolloServer = await createApolloServer(config, keycloakService);
  apolloServer.applyMiddleware({ app });

  const server = app.listen(config.port, () => {
    createSubscriptionServer({
      securityService: keycloakService,
      schema: (apolloServer as unknown as any).schema
    }, {
      path: '/graphql',
      server
    })
  })
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
}).then(() => {
  console.log(`\n    ***********************************************************
    🎮 Ionic PWA application available at http://localhost:${config.port}
    🚀 GraphQL Playground is available at http://localhost:${config.port}/graphql
    ***********************************************************`)
})


process.on('unhandledRejection', (error: any) => {
  console.error(error.message, error.stack)
  process.exit(1)
})
