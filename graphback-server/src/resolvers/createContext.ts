import {
  createMongoCRUDRuntimeContext,
} from '@graphback/runtime-mongo';

// TODO - Remove this from generator
import {
  KnexRuntimeContextConfig
} from '@graphback/runtime';


export const createCRUDResolversRuntimeContext = (
  options: KnexRuntimeContextConfig
) => {
  const { schema, db, pubSub } = options;

  const taskPubSubContext = {
    pubSub,
    publishCreate: false,
    publishUpdate: false,
    publishDelete: false
  };

  return {
    Task: createMongoCRUDRuntimeContext('Task', schema, db, taskPubSubContext)
  };
}
