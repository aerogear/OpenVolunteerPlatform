const express = require('express')
const fs = require('fs')
const path = require('path')

const { ApolloServer } = require('apollo-server-express')

const connect = require('./db')
const schema = require('./schema')
const http = require('http');

const dbOptions = {
  database: process.env.POSTGRES_DATABASE || 'users',
  user: process.env.POSTGRES_USERNAME || 'postgresql',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: process.env.POSTGRES_PORT || '5432'
}

const PORT = 4000

async function start () {
  const app = express()

  // connect to db
  const dataSource = {
    client: await connect(dbOptions),
    type: 'knex'
  }

  const apolloServer = new ApolloServer({
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
          endpoint: `http://localhost:${PORT}/graphql`,
          variables: JSON.stringify({}),
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
