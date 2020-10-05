import dotenv from 'dotenv';
// Setup env variables
dotenv.config();

import cors from 'cors';
import express from 'express';
import http from 'http';
import { config } from './config/config';
import { createApolloServer } from './graphql';

async function start() {
  const app = express();

  app.use(cors());
  app.use('/', express.static('website'))
  app.use('/admin', express.static('admin'))

  // TODO - this is not needed since ApolloServer will automatically set a healthcheck endpoint /.well-known/apollo/server-health
  app.get('/health', (req, res) => res.sendStatus(200));

  const apolloServer = await createApolloServer(app, config);
  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(config.port, () => {
    console.log(`\n    ***********************************************************
    🎮 Ionic PWA application available at http://localhost:${config.port}
    🎮 GraphQL API available at http://localhost:${config.port}/graphql
    🎮 Admin PWA application available at http://localhost:${config.port}/admin
    ***********************************************************`)
  })
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
})


process.on('unhandledRejection', (error: any) => {
  console.error(error.message, error.stack)
  process.exit(1)
})
