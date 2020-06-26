import { Express } from "express";
import { config } from './config/config';

import {
    KeycloakTypeDefs,
    KeycloakSchemaDirectives,
    KeycloakSubscriptionContext,
    KeycloakSubscriptionHandler,
    KeycloakContext
} from 'keycloak-connect-graphql'

const session = require('express-session')
const Keycloak = require('keycloak-connect')

export function buildKeycloakApolloConfig(app: Express, apolloConfig: any) {
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
    const keycloakSubscriptionHandler = new KeycloakSubscriptionHandler({ keycloak })

    app.use(keycloak.middleware())
    
    // For production we want to protect /graphql endpoint
    // For development we want to test our queries using graphql playground
    if(process.env.NODE_ENV === 'production'){
        app.use(graphqlPath, keycloak.protect());
    }

    return {
        typeDefs: [KeycloakTypeDefs, apolloConfig.typeDefs], // 1. Add the Keycloak Type Defs
        schemaDirectives: KeycloakSchemaDirectives,
        resolvers: apolloConfig.resolvers,
        playground: apolloConfig.playground,
        path: graphqlPath,
        context: (context: any) => {
            return {
                ...apolloConfig.context(context),
                kauth: new KeycloakContext({ req: context.req }) // 3. add the KeycloakContext to `kauth`
            }
        },
        subscriptions: {
            onConnect: async (connectionParams, websocket, connectionContext) => {
                const token = await keycloakSubscriptionHandler.onSubscriptionConnect(connectionParams)
                if (!token) {
                    throw new Error("Cannot build keycloak token. Connection will be terminated")
                }
                return {
                    ...apolloConfig.context,
                    kauth: new KeycloakSubscriptionContext(token)
                }
            }
        },
    }
}


