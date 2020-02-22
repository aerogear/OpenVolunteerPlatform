
import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { buildSchema } from 'graphql';
import { join } from 'path';
import { connect } from './db';
import resolvers from './resolvers/resolvers';
import { models } from './resolvers/models'
import { createMongoCRUDRuntimeContext } from "@graphback/runtime-mongo";
import { KeycloakSecurityService } from '@aerogear/voyager-keycloak';
import { VoyagerServer } from '@aerogear/voyager-server'
import { getPubSub } from './pubsub'
/**
 * Creates Apollo server
 */
export const createApolloServer = async function(keycloakService: KeycloakSecurityService) {
    const db = await connect();
    const pubSub = getPubSub();

    const voyagerConfig = {
        securityService: keycloakService
    }

    const typeDefs = loadSchemaFiles(join(__dirname, '/schema/')).join('\n');
    const schema = buildSchema(typeDefs);
    const context = createMongoCRUDRuntimeContext(models, schema, db, pubSub);
    const apolloServer = VoyagerServer({
        typeDefs: typeDefs,
        resolvers,
        context,
        playground: true
    }, voyagerConfig)

    // Broken typings
    return apolloServer as any;
}
