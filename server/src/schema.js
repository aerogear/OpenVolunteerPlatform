const mergeResolvers = require("deepmerge").all
const mergeTypes = require('merge-graphql-schemas').mergeTypes;

const {
    taskTypeDefs,
    subscriptionTypeDefs,
    taskResolvers,
    subscriptionResolvers
} = require('./tasks')


// TODO Replace with GraphQL-modules once Voyager will allow for that

const appResolvers = mergeResolvers([taskResolvers, subscriptionResolvers])
const appTypeDefs = mergeTypes([taskTypeDefs, subscriptionTypeDefs], 
    { all: true })

module.exports = {
    appTypeDefs, appResolvers
}