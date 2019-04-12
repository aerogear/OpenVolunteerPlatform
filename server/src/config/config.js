const fs = require('fs')
const path = require('path')

class Config {
  constructor() {
    this.port = process.env.PORT || 4000
    this.db = {
      database: process.env.DB_NAME || 'users',
      user: process.env.DB_USERNAME || 'postgresql',
      password: process.env.DB_PASSWORD || 'postgres',
      host: process.env.DB_HOSTNAME || '127.0.0.1',
      port: process.env.DB_PORT || '5432'
    }

    this.appUrl = process.env.URL || 'http://localhost:4000'

    this.keycloakConfigPath = process.env.KEYCLOAK_CONFIG || path.resolve(__dirname, './keycloak.json')
    this.keycloakConfig = readConfig(this.keycloakConfigPath)

    this.pushConfigPath = process.env.PUSH_CONFIG || path.resolve(__dirname, './push-config.json')
    this.pushConfig = readConfig(this.pushConfigPath)

    this.altairConfig = {
      endpointURL: '/graphql',
      subscriptionsEndpoint: 'ws://localhost:4000/graphql',
      initialQuery: fs.readFileSync(path.resolve(__dirname, './playground.gql'), 'utf8'),
    }
  }
}

function readConfig(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (e) {
    console.error(`Warning: couldn't find config at ${path}`)
  }
}

module.exports = new Config()