import fs from 'fs'
import path from 'path'

export class Config {
  public port: string | number
  public db: { database: string; connection: string }
  public keycloakConfigPath: string
  public keycloakConfig: any
  public kafka: any;

  constructor() {
    this.port = process.env.PORT || 4000

    this.db = {
      database: process.env.MONGO_COLLECTION || 'showcase',
      connection: process.env.MONGO_CONNECTION || 'mongodb://user:password@127.0.0.1:27017/showcase'
    }

    this.kafka = {
      host: process.env.KAFKA_HOST || '127.0.0.1',
      port: process.env.KAFKA_PORT || 9092
    };

    this.keycloakConfigPath = process.env.KEYCLOAK_CONFIG || path.resolve(__dirname, './keycloak.json')
    this.keycloakConfig = readConfig(this.keycloakConfigPath)
  }
}

function readConfig(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (e) {
    console.error(`Warning: couldn't find keycloak config at ${path}`)
  }
}

export const config = new Config()