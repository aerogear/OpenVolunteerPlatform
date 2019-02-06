const { gql } = require('apollo-server')
const { pubSub } = require('../subscriptions')

const TASKS_SUBSCRIPTION_KEY = 'tasks'


const subscriptionTypeDefs = `
type Subscription {
  tasks: TaskSubscription!
}

type TaskSubscription {
  action: actionType!
  task: Task!
}

enum actionType {
  CREATED
  MUTATED
  DELETED
}
`

const subscriptionResolvers = {
  Subscription: {
    tasks: {
      subscribe: () => pubSub.asyncIterator(TASKS_SUBSCRIPTION_KEY)
    }
  },
}

module.exports = {
  subscriptionTypeDefs,
  subscriptionResolvers,
  TASKS_SUBSCRIPTION_KEY
}