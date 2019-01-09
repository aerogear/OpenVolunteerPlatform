const express = require('express')
const fs = require('fs')
const path = require('path')

const { ApolloVoyagerServer } = require('@aerogear/apollo-voyager-server')

const connect = require('./db')
const schema = require('./schema')
const http = require('http');

const dbOptions = {
  database: process.env.DB_NAME || 'users',
  user: process.env.DB_USERNAME || 'postgresql',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOSTNAME || '127.0.0.1',
  port: process.env.DB_PORT || '5432'
}

const PORT = 4000

async function start() {
  const app = express()

  app.get("/health", (req, res) => {
    return res.json({});
  });

  // connect to db
  const dataSource = {
    client: await connect(dbOptions),
    type: 'knex'
  }

  const apolloServer = ApolloVoyagerServer({
    schema,
    context: async ({ req }) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: dataSource.client,
      }
    },
    playground: {
      settings: {
        'editor.theme': 'light',
        'editor.cursorShape': 'block'
      },
      tabs: [
        {
          endpoint: `/graphql`,
          variables: {},
          query: fs.readFileSync(path.resolve(__dirname, './playground.gql'), 'utf8')
        }
      ]
    }
  })
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer)
  apolloServer.applyMiddleware({ app })


  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}/graphql`);
  });
}

start()
