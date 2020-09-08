import { resolve } from 'path';
import { connect } from './db';
import { Config } from './config/config';
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { Express } from "express";
import customResolvers from './resolvers/custom-resolvers';
import { buildKeycloakApolloConfig } from './auth';
import { createKeycloakCRUDService } from './CrudService'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { buildGraphbackAPI } from "graphback"
import { createMongoDbProvider } from "@graphback/runtime-mongo"
import { authConfig } from './config/auth';
import GMR from 'graphql-merge-resolvers';

/**
 * Creates Apollo server
 */
export const createApolloServer = async function (app: Express, config: Config) {
    const db = await connect(config);

    const modelDefs = loadSchemaSync(resolve(__dirname, '../model/main.graphql'), {
        loaders: [
            new GraphQLFileLoader()
        ]
    })

    const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
        serviceCreator: createKeycloakCRUDService(authConfig),
        dataProviderCreator: createMongoDbProvider(db)
    });
    // TODO enable custom resolvers
    const mergedResolvers: any = GMR.merge([resolvers, customResolvers]);
    let apolloConfig: ApolloServerExpressConfig = {
        typeDefs: typeDefs,
        resolvers: mergedResolvers,
        playground: true,
        context: (context) => {
            return {
                ...contextCreator(context),
                db: db
            }
        }
    }

    if (config.keycloakConfig) {
        apolloConfig = buildKeycloakApolloConfig(app, apolloConfig)
    }

    const apolloServer = new ApolloServer(apolloConfig)
    apolloServer.applyMiddleware({ app });

    return apolloServer;
}
