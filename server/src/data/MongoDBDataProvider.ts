import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { NoDataError } from '@graphback/runtime';
import { getDatabaseArguments } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, GraphbackPubSubModel, CRUDService } from '@graphback/runtime-mongo';
import { PubSubEngine } from 'apollo-server-express';

/**
 * Mongo provider that contains special handlers for offix conflict resolution format:
 * 
 * https://offix.dev/docs/conflict-server#structure-of-the-conflict-error
 */
export class ExtendedMongoDBDataProvider<Type = any, GraphbackContext = any> extends MongoDBDataProvider<Type, GraphbackContext> {

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
  }

  public async create(data: any): Promise<Type> {
    if (!data.version) {
      data.version = 1;
    }

    return super.create(data);
  }


  public async update(data: any): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    if(!idField){
      throw new Error("Id missing");
    }
    // TODO Can be improved by conditional updates 
    const queryResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(idField.value) }).toArray();
    if (queryResult && queryResult[0]) {
      queryResult[0][idField.name] = queryResult[0]._id;
      if (data.version !== queryResult[0].version) {
        const conflictError: any = new Error();
        conflictError.conflictInfo = { serverState: queryResult[0], clientState: data };
        throw conflictError
      }
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      data.version = data.version + 1;
      // TODO use findOneAndUpdate to check consistency afterwards
      const result = await this.db.collection(this.collectionName).updateOne({ _id: new ObjectId(idField.value) }, { $set: data });
      if (result.result.ok) {
        return data;
      }
    }

    throw new NoDataError(`Cannot update ${this.collectionName}`);
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
  db: any, pubSub: PubSubEngine
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

    const objectDB = new ExtendedMongoDBDataProvider(modelType, db)

    services[model.name] = new CRUDService(modelType, objectDB, {
      pubSub,
      ...model.pubSub
    })

    return services;
  }, {})

}