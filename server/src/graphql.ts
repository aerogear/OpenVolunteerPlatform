
import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'graphql';
import { join } from 'path';
import { connect } from './db';
import resolvers from './resolvers/resolvers';
import { models } from './resolvers/models'
import { createMongoCRUDRuntimeContext } from "@graphback/runtime-mongo";

/**
 * Creates Apollo server
 */
export const createApolloServer = async () => {
    const db = await connect();
    const pubSub = new PubSub();

    const typeDefs = loadSchemaFiles(join(__dirname, '/schema/')).join('\n');
    const schema = buildSchema(typeDefs);
    const context = createMongoCRUDRuntimeContext(models, schema, db, pubSub);
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers,
        context,
        playground: true
    });

    return apolloServer;
}
