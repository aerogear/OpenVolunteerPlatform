import { ConflictListener } from 'offix-client';

export class ConflictLogger implements ConflictListener {
  conflictOccurred(operationName:any, resolvedData:any, server:any, client:any) {
    console.log("Conflict occurred with the following:")
    console.log(`
      data: ${JSON.stringify(resolvedData)}, 
      server: ${JSON.stringify(server)}, 
      client: ${JSON.stringify(client)}, 
      operation:  ${JSON.stringify(operationName)}
    `);
  }
  mergeOccurred(operationName:any, resolvedData:any, server:any, client:any) {
    console.log("Merge occurred with the following:")
    console.log(`
      data: ${JSON.stringify(resolvedData)}, 
      server: ${JSON.stringify(server)}, 
      client: ${JSON.stringify(client)}, 
      operation:  ${JSON.stringify(operationName)}
    `);
  }
}
