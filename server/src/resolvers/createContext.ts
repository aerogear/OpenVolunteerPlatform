import {
  createKnexCRUDRuntimeContext,
  KnexRuntimeContextConfig
} from "@graphback/runtime"

export const createCRUDResolversRuntimeContext = (
  options: KnexRuntimeContextConfig
) => {
  const { schema, db, pubSub } = options

  const taskPubSubContext = {
    pubSub,
    publishCreate: true,
    publishUpdate: true,
    publishDelete: true
  }

  return {
    Task: createKnexCRUDRuntimeContext("Task", schema, db, taskPubSubContext)
  }
}
