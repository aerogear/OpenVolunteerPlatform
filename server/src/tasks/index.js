
const { taskTypeDefs, taskResolvers } = require('./schema')
const { subscriptionTypeDefs, subscriptionResolvers } = require('./subscriptions')

module.exports = {
    taskTypeDefs, taskResolvers,
    subscriptionTypeDefs, subscriptionResolvers
}