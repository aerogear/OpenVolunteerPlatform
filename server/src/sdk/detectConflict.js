const { GraphQLError } = require('graphql')

// TODO move to enum
const prefix = "AgSync:"
const CONFLICT_TYPE = prefix + "DataConflict"
const VALIDATION_TYPE = prefix + "Validation"

/**
 * Represents server side error
 */
class SyncServerError extends GraphQLError {
    constructor(message, data, type) {
        super(message)
        this.type = type || VALIDATION_TYPE
        this.data = data
        this.version = data.version
    }
}

// Default strategy for conflict resolution
// Method accept server and client and return true if conflict detected
const defaultConflictDetection = (server, client) => {
    if (server.version && client.version) {
        if (server.version !== client.version) {
            return new SyncServerError("Conflict when saving data", server, CONFLICT_TYPE)
        }
    } else {
        console.trace("conflict resolution not enabled")
    }
}

const detectConflict = defaultConflictDetection;

module.exports = { SyncServerError, detectConflict }