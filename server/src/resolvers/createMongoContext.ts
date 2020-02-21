import {
  createMongoCRUDRuntimeContext

} from "@graphback/runtime-mongo"

export const createCRUDResolversRuntimeContext = (
  schema: any, db: any, pubSub: any
) => {
  const model = [
    {
      name: "Task",
      pubSub: {
        publishCreate: true,
        publishUpdate: true,
        publishDelete: true
      }
    }
  ];

  return createMongoCRUDRuntimeContext(model, schema, db, pubSub);
  
}
