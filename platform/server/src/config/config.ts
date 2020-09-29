import fs from 'fs'
import path from 'path'

export class Config {
  public port: string | number
  public db: { database: string; user?: string; password?: string; host: string, port: number | string }
  public keycloakConfigPath: string
  public keycloakConfig: any
  public kafka: any;

  constructor() {
    this.port = process.env.PORT || 4000

    this.db = {
      database: process.env.MONGO_COLLECTION || 'showcase',
      host: process.env.MONGO_HOST || '127.0.0.1',
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      port: process.env.MONGO_PORT || 27017
    }

    this.kafka = {
      host: process.env.KAFKA_HOST || '127.0.0.1',
      port: process.env.KAFKA_PORT || 9092,
      globalConfig: {
      }
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