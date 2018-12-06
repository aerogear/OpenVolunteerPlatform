const { gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const { pubSub, EVENTS } = require('./subscriptions')

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
  taskCreated: Task,
  taskModified: Task,
  taskDeleted: ID
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
      pubSub.publish(EVENTS.TASK.CREATED, {
        taskCreated: result,
      });
      return result
    },
    updateTask: async (obj, args, context, info) => {
      const task = await context.db('tasks').select()
        .where('id', args.id).then((rows) => rows[0])
      if (!task) {
        throw new Error(`Invalid ID for task object: ${args.id}`);
      }
      const update = await context.db('tasks').update(args)
        .where({ 'id': args.id }).returning('*').then((rows) => rows[0])
      pubSub.publish(EVENTS.TASK.MODIFIED, {
        taskModified: update
      });
      return update;
    },
    deleteTask: async (obj, args, context, info) => {
      const result = await context.db('tasks').delete()
        .where('id', args.id).returning('*').then((rows) => {
          if (rows[0]) {
            const deletedId = rows[0].id
            pubSub.publish(EVENTS.TASK.DELETED, {
              taskDeleted: deletedId
            });
            return deletedId;
          } else {
            throw new Error(`Cannot delete object ${args.id}`);
          }
        })
      return result
    }
  },
  // TODO add helper/package to support generating subscription resolvers 
  Subscription: {
    taskCreated: {
      subscribe: () => pubSub.asyncIterator(EVENTS.TASK.CREATED)
    },
    taskDeleted: {
      subscribe: () => pubSub.asyncIterator(EVENTS.TASK.DELETED)
    },
    taskModified: {
      subscribe: () => pubSub.asyncIterator(EVENTS.TASK.MODIFIED)
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
