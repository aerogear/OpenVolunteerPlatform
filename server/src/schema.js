const { gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const { GraphQLNonNull } = require('graphql')
const { combineResolvers, pipeResolvers } = require('graphql-resolvers')
const { pubSub, EVENTS } = require('./subscriptions')
const { withConflict } = require('./sdk/withConflict')

const typeDefs = gql`
type Task {
  id: ID!
  version: Int
  title: String!
  description: String!
}

type Query {
  allTasks(first: Int, after: String): [Task],
  getTask(id: ID!): Task
}

type Mutation {
  createTask(title: String!, description: String!): Task
  updateTask(id: ID!, title: String, description: String, version: Int!): Task
  deleteTask(id: ID!): ID
}

type Subscription {
  TaskCreated: Task
}
`

const resolvers = {
  Query: {
    allTasks: async (obj, args, context) => {
      const result = context.db.select().from('tasks')
      if (args.first && args.after) {
        result.limit(args.first)
        result.offset(args.after)
      } else if (args.first) {
        result.limit(args.first)
      } else {
        // Default limit
        result.limit(5)
      }
      return result
    },
    getTask: async (obj, args, context, info) => {
      const result = await context.db.select().from('tasks').where('id', args.id).then((rows) => rows[0])
      return result
    }
  },

  Mutation: {
    createTask: async (obj, args, context, info) => {
      const result = await context.db('tasks').insert({ ...args, version: 1 }).returning('*').then((rows) => rows[0])
      // TODO context helper for publishing subscriptions in SDK?
      console.log("result", result);
      pubSub.publish(EVENTS.Task.CREATED, {
        TaskCreated: result,
      });
      return result
    },
    updateTask: async (obj, args, context, info) => {
      return context.withConflict({
        args,
        read: async (db, args) => {
          return await db('tasks').select().where('id', args.id).then((rows) => rows[0])
        },
        write: async (db, data) => {
          return await db('tasks').update(data).where({ 'id': args.id }).returning('*').then((rows) => rows[0])
        },
        conflictHandler: context.conflictHandlers.RETURN_TO_CLIENT
      })
    },
    deleteTask: async (obj, args, context, info) => {
      const result = await context.db('tasks').delete().where('id', args.id).returning('*').then((rows) => rows[0])
      return result
    }
  },
  Subscription: {
    TaskCreated: {
      subscribe: () => pubSub.asyncIterator(EVENTS.Task.CREATED),
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
