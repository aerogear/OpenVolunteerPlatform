const { pubSub } = require('../subscriptions')

const TASK_ADDED = 'TASK_ADDED'
const TASK_DELETED = 'TASK_DELETED'
const TASK_UPDATED = 'TASK_UPDATED'


const subscriptionTypeDefs = `
type Subscription {
  taskAdded: Task,
  taskDeleted: Task,
  taskUpdated: Task
}
`

const subscriptionResolvers = {
  Subscription: {
    taskAdded: {
      subscribe: () => pubSub.asyncIterator(TASK_ADDED)
    },
    taskDeleted: {
      subscribe: () => pubSub.asyncIterator(TASK_DELETED)
    },
    taskUpdated: {
      subscribe: () => pubSub.asyncIterator(TASK_UPDATED)
    }
  },
}

module.exports = {
  subscriptionTypeDefs,
  subscriptionResolvers,
  TASK_ADDED,
  TASK_DELETED,
  TASK_UPDATED
}