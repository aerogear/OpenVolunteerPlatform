import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { buildSchema } from 'graphql';
import { join } from 'path';
import { connect } from './db';
import resolvers from './resolvers/resolvers';
import { models } from './resolvers/models'
import { getPubSub } from './pubsub'
import { Config } from './config/config';
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { Express } from "express";
import { buildKeycloakApolloConfig } from './auth';
import { createMongoCRUDRuntimeContext } from './mongo/createMongoServices';

/**
 * Creates Apollo server
 */
export const createApolloServer = async function (app: Express, config: Config) {
    const db = await connect(config);
    const pubSub = getPubSub();

    const typeDefs = loadSchemaFiles(join(__dirname, '/schema/')).join('\n');
    const schema = buildSchema(typeDefs, { assumeValid: true });
    const context = createMongoCRUDRuntimeContext(models, schema, db, pubSub);

    let apolloConfig: ApolloServerExpressConfig = {
        typeDefs: typeDefs,
        resolvers,
        playground: true,
        context: context
    }

    apolloConfig = buildKeycloakApolloConfig(app, apolloConfig)

    const apolloServer = new ApolloServer(apolloConfig)
    apolloServer.applyMiddleware({ app });

    return apolloServer;
}
