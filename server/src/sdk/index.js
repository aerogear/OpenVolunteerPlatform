const { handleConflict, conflictHandlers } = require('./handleConflict')
const { SyncServerError, detectConflict } = require('./detectConflict')
const { withConflict } = require('./withConflict')

module.exports = {
  detectConflict,
  handleConflict,
  conflictHandlers,
  withConflict
}