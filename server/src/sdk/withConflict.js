const { SyncServerError, detectConflict } = require('./detectConflict')
const { handleConflict } = require('./handleConflict')

const dataSourceMappings = {
  'knex': withConflictKnex
}

function withConflict(dataSource) {
  const { type } = dataSource

  const withConflictFn = dataSourceMappings[type]
  
  if (withConflictFn) {
    return withConflictFn.bind(dataSource)
  }
}

async function withConflictKnex(options) {
  const dataSource = this
  const client = dataSource.client
  const { args, read, write, conflictHandler } = options
  let { id, version, ...writeData } = args
  writeData.version = version + 1

  return new Promise((resolve, reject) => {
    client.transaction(async (trx) => {
      // Call the user supplied function to retrieve the current record
      let currentRecord = read(trx, args)

      // If result is a Promise then resolve it
      if (currentRecord instanceof Promise) {
        currentRecord = await currentRecord
      }

      // detect a conflict
      const conflict = detectConflict(currentRecord, args)

      // use the client supplied conflict handler
      if (conflict) {
        writeData = handleConflict(conflictHandler, conflict, currentRecord, args)
      }

      let writeResult = write(trx, writeData)

      if (writeResult instanceof Promise) {
        writeResult = await writeResult
      }

      resolve(writeResult)
    })
    .catch(reject)
  })
}

module.exports = {
  withConflict
}