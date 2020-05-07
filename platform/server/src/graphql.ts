import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { join } from 'path';
import { connect } from './db';
import resolvers from './resolvers/resolvers';
import scalars from './resolvers/scalars';
import customResolvers from './resolvers/custom-resolvers';
import { models } from './resolvers/models'
import { getPubSub } from './pubsub'
import { Config } from './config/config';
import { ApolloServer, ApolloServerExpressConfig, makeExecutableSchema } from "apollo-server-express";
import { buildKeycloakApolloConfig } from './auth';
import { createMongoCRUDRuntimeContext } from './mongo/createMongoServices';

/**
 * Creates Apollo server
 */
export const createApolloServer = async function (app: any, config: Config) {
    const db = await connect(config);
    const pubSub = getPubSub();

    const typeDefs = loadSchemaFiles(join(__dirname, '/schema/')).join('\n');
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
        resolverValidationOptions: { requireResolversForResolveType: false },
      });
    const context = createMongoCRUDRuntimeContext(models, schema, db, pubSub);

    let apolloConfig: ApolloServerExpressConfig = {
        typeDefs: typeDefs,
        resolvers: { ...resolvers, ...scalars, ...customResolvers},
        playground: true,
        context: context
    }

    apolloConfig = buildKeycloakApolloConfig(app, apolloConfig)

    const apolloServer = new ApolloServer(apolloConfig)
    apolloServer.applyMiddleware({ app });

    return apolloServer;
}
