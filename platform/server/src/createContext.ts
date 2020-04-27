import { GraphbackPubSubModel, OffixMongoDBDataProvider, CRUDService } from '@graphback/runtime-mongo'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { Db } from 'mongodb'
import { PubSubEngine } from 'apollo-server-express'
import { GraphbackOperationType } from '@graphback/core'


class AMQCRUDService extends CRUDService {
    protected subscriptionTopicMapping(triggerType: GraphbackOperationType, objectName: string) {
        // Support AMQ topic creation format
        return `graphql/${objectName}_${triggerType}`
    }
}

/**
 * Helper function for creating mongodb runtime context used in Graphback
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export const createOffixMongoCRUDRuntimeContext = (
    models: GraphbackPubSubModel[], schema: GraphQLSchema,
    db: Db, pubSub: PubSubEngine
) => {
    if (!models || models.length === 0) {
        throw new Error(`No models provided`)
    }

    return models.reduce((services: any, model: GraphbackPubSubModel) => {
        const modelType = schema.getType(model.name) as GraphQLObjectType
        if (modelType === undefined) {
            throw new Error(`
        Schema is missing provided type. 
        Please make sure that you pass the right schema to createCRUDRuntimeContext`)
        }

        const objectDB = new OffixMongoDBDataProvider(modelType, db)
        services[model.name] = new AMQCRUDService(modelType, objectDB, {
            pubSub,
            ...model.pubSub
        })

        return services;
    }, {})

}