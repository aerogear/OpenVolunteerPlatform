const merge = require('deepmerge')

function RETURN_TO_CLIENT (conflict, currentRecord, client) {
  console.warn(`Conflict detected. Server: ${currentRecord} client: ${client}`)
  throw conflict
}

function CLIENT_WINS (conflict, currentRecord, client) {
  console.warn(`Conflict detected. Server: ${currentRecord} client: ${client}`)
  const newVersion = currentRecord.version + 1
  const newRecord = { ...client, version: newVersion }
  return newRecord
}

function SERVER_WINS (conflict, currentRecord, client) {
  console.warn(`Conflict detected. Server: ${currentRecord} client: ${client}`)
  throw conflict
}

function MERGE_CLIENT_ONTO_SERVER (conflict, currentRecord, client) {
  console.warn(`Conflict detected. Server: ${currentRecord} client: ${client}`)
  const newVersion = currentRecord.version + 1
  const newRecord = { ...merge(currentRecord, client), version: newVersion }
  return newRecord
}

function MERGE_SERVER_ONTO_CLIENT (conflict, currentRecord, client) {
  console.warn(`Conflict detected. Server: ${currentRecord} client: ${client}`)
  const newVersion = currentRecord.version + 1
  const newRecord = merge(client, currentRecord)
  newRecord.version = newVersion
  return newRecord
}

const handlerFns = {
  RETURN_TO_CLIENT,
  CLIENT_WINS,
  SERVER_WINS,
  MERGE_CLIENT_ONTO_SERVER,
  MERGE_SERVER_ONTO_CLIENT
}

const handleConflict = function(handler, conflict, currentRecord, client) {
  const conflictHandler = handlerFns[handler]
  if (conflictHandler) {
    return conflictHandler(conflict, currentRecord, client)
  }
  throw new Error(`error handling conflict - handler ${handlder} does not exist`)
}

module.exports = {
  handleConflict,
  conflictHandlers: {
    RETURN_TO_CLIENT: 'RETURN_TO_CLIENT',
    CLIENT_WINS: 'CLIENT_WINS',
    SERVER_WINS: 'SERVER_WINS',
    MERGE_CLIENT_ONTO_SERVER: 'MERGE_CLIENT_ONTO_SERVER',
    MERGE_SERVER_ONTO_CLIENT: 'MERGE_SERVER_ONTO_CLIENT'
  }
}