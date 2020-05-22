import { printSchema } from 'graphql';
import { GraphbackRuntime } from 'graphback';
import { connect } from './db';
import path from 'path';
import scalars from './resolvers/scalars';
import customResolvers from './resolvers/custom-resolvers';
import { getPubSub } from './pubsub'
import { Config } from './config/config';
import { loadConfigSync } from 'graphql-config';
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { buildKeycloakApolloConfig } from './auth';
import { createMongoCRUDRuntimeContext } from '@graphback/runtime-mongo';

/**
 * Creates Apollo server
 */
export const createApolloServer = async function (app: any, config: Config) {
    const db = await connect(config);
    const pubSub = getPubSub();

    const projectConfig = loadConfigSync({
        extensions: [
            () => ({ name: 'graphback' }),
        ]
    }).getDefault()

    const graphbackConfig = projectConfig.extension('graphback');
    const model = projectConfig.loadSchemaSync(path.resolve(graphbackConfig.model));
    const runtimeEngine = new GraphbackRuntime(model, graphbackConfig);
    const models = runtimeEngine.getDataSourceModels();
    const context = createMongoCRUDRuntimeContext(models, model, db, pubSub);
    const { schema, resolvers } = runtimeEngine.buildRuntime(context);


    let apolloConfig: ApolloServerExpressConfig = {
        typeDefs: printSchema(schema),
        resolvers: { ...resolvers, ...scalars, ...customResolvers },
        playground: true
    }

    apolloConfig = buildKeycloakApolloConfig(app, apolloConfig)

    const apolloServer = new ApolloServer(apolloConfig)
    apolloServer.applyMiddleware({ app });

    return apolloServer;
}
