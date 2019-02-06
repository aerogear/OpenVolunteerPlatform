const mergeResolvers = require("deepmerge").all
const mergeTypes = require('merge-graphql-schemas').mergeTypes;

const {
    taskTypeDefs,
    subscriptionTypeDefs,
    taskResolvers,
    subscriptionResolvers
} = require('./tasks')


const {
    fileTypeDefs,
    fileResolvers,
} = require('./files')
// TODO Replace with GraphQL-modules once Voyager will allow for that

const appResolvers = mergeResolvers([taskResolvers, subscriptionResolvers, fileResolvers])
const appTypeDefs = mergeTypes([taskTypeDefs, subscriptionTypeDefs, fileTypeDefs], 
    { all: true })

module.exports = {
    appTypeDefs, appResolvers
}