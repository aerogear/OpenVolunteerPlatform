import dotenv from 'dotenv';
// Setup env variables
dotenv.config()

import cors from 'cors';
import express from 'express';
import http from 'http'
import { config } from './config/config'
import { createApolloServer } from './graphql';

async function start() {
  const app = express();

  app.use(cors());
  app.use('/app', express.static('website'))
  app.get('/health', (req, res) => res.sendStatus(200));

  const apolloServer = await createApolloServer(app, config);
  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  app.get('/', (req, res) => { res.redirect('/app') });

  httpServer.listen(config.port, () => {
    console.log(`\n    ***********************************************************
    🎮 Ionic PWA application available at http://localhost:${config.port}/app
    🚀 GraphQL Playground is available at http://localhost:${config.port}/graphql
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
