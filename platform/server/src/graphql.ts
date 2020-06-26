import { resolve } from 'path';
import { connect } from './db';
import { Config } from './config/config';
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { Express } from "express";
import scalars from './resolvers/scalars';
import customResolvers from './resolvers/custom-resolvers';
import { buildKeycloakApolloConfig } from './auth';
import { createKeycloakAndAMQCRUDService } from './AMQCrudService'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { buildGraphbackAPI } from "graphback"
import { DataSyncPlugin, createDataSyncMongoDbProvider, createDataSyncCRUDService } from "@graphback/datasync"
import { authConfig } from './config/auth';

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
        serviceCreator: createKeycloakAndAMQCRUDService(authConfig),
        dataProviderCreator: createDataSyncMongoDbProvider(db),
        plugins: [
            new DataSyncPlugin()
        ]
    });

    let apolloConfig: ApolloServerExpressConfig = {
        typeDefs: typeDefs,
        // See https://github.com/aerogear/graphback/issues/1546
        resolvers: Object.assign(resolvers, customResolvers, scalars),
        playground: true,
        context: contextCreator
    }

    if (config.keycloakConfig) {
        apolloConfig = buildKeycloakApolloConfig(app, apolloConfig)
    }

    apolloConfig.resolvers = { ...apolloConfig.resolvers, ...scalars, ...customResolvers };

    const apolloServer = new ApolloServer(apolloConfig)
    apolloServer.applyMiddleware({ app });

    return apolloServer;
}
