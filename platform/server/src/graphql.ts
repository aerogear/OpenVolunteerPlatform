import { printSchema } from 'graphql';
import { buildGraphbackAPI } from 'graphback';
import { connect } from './db';
import path from 'path';
import scalars from './resolvers/scalars';
import customResolvers from './resolvers/custom-resolvers';
import { getPubSub } from './pubsub'
import { Config } from './config/config';
import { loadConfigSync } from 'graphql-config';
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { buildKeycloakApolloConfig } from './auth';
import { createCRUDService, createMongoDbProvider } from '@graphback/runtime-mongo';

/**
 * Creates Apollo server
 */
export const createApolloServer = async function (app: any, config: Config) {
    const db = await connect(config);
    
    const projectConfig = loadConfigSync({
        extensions: [
            () => ({ name: 'graphback' }),
        ]
    }).getDefault()

    const graphbackConfig = projectConfig.extension('graphback');
    const model = projectConfig.loadSchemaSync(path.resolve(graphbackConfig.model));
    const { typeDefs, resolvers, services} = buildGraphbackAPI(model, {
        serviceCreator: createCRUDService({
          pubSub:getPubSub()
        }),
        dataProviderCreator: createMongoDbProvider(db)
      });

    let apolloConfig: ApolloServerExpressConfig = {
        typeDefs,
        resolvers: { ...resolvers, ...scalars, ...customResolvers },
        playground: true,
        context: (context: any) => ({
                ...context,
                services
        })
    }

    apolloConfig = buildKeycloakApolloConfig(app, apolloConfig);
    const apolloServer = new ApolloServer(apolloConfig);
    apolloServer.applyMiddleware({ app });

    return apolloServer;
}
