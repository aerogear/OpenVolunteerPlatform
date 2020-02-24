import { KeycloakContext, KeycloakTypeDefs, KeycloakSchemaDirectives } from 'keycloak-connect-graphql';
import { Express } from "express";
import { config } from './config/config';

const session = require('express-session')
const Keycloak = require('keycloak-connect')

export function buildKeycloakApolloConfig(app: Express, apolloConfig: any) {
    if (config.keycloakConfig) {
        const graphqlPath = `/graphql`;
        console.log("Using keycloak configuration")

        const memoryStore = new session.MemoryStore()
        app.use(session({
            secret: process.env.SESSION_SECRET_STRING || 'this should be a long secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
        }))

        const keycloak = new Keycloak({
            store: memoryStore
        }, config.keycloakConfig);

        app.use(keycloak.middleware())

        app.use(graphqlPath, keycloak.protect());

        return {
            typeDefs: [KeycloakTypeDefs, apolloConfig.typeDefs], // 1. Add the Keycloak Type Defs
            schemaDirectives: KeycloakSchemaDirectives as any, // 2. Add the KeycloakSchemaDirectives
            resolvers: apolloConfig.resolvers,
            playground: apolloConfig.playground,
            path: graphqlPath,
            context: ({ req }) => {
                return {
                    ...apolloConfig.context,
                    kauth: new KeycloakContext({ req }) // 3. add the KeycloakContext to `kauth`
                }
            }
        }
    } else {
        console.log("Keycloak not configured. Auth will be disabled");
        return apolloConfig;
    }
}


