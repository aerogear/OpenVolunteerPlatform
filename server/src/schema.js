const { gql } = require('apollo-server')
const { pubSub } = require('./subscriptions')
const { conflictHandler } = require("@aerogear/voyager-conflicts")

const typeDefs = gql `

directive @hasRole(role: [String]) on FIELD | FIELD_DEFINITION


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

const resolvers = {
  Query: {
    allTasks: async (obj, args, context) => {
      const result = context.db.select().from('tasks')
      if (args.first && args.after) {
        result.limit(args.first)
        result.offset(args.after)
      } else if (args.first) {
        result.limit(args.first)
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
      console.log("Create", args)
      const result = await context.db('tasks').insert({ ...args,
        version: 1
      }).returning('*').then((rows) => rows[0])
      // TODO context helper for publishing subscriptions in SDK?
      publish('CREATED', result)
      return result
    },
    updateTask: async (obj, clientData, context, info) => {
      console.log("Update", clientData)
      const task = await context.db('tasks').select()
        .where('id', clientData.id).then((rows) => rows[0])
      if (!task) {
        throw new Error(`Invalid ID for task object: ${clientData.id}`);
      }

      if (conflictHandler.hasConflict(task, clientData)) {
        const { response } = conflictHandler.resolveOnClient(task, clientData)
        return response
      }
      conflictHandler.nextState(clientData)

      const update = await context.db('tasks').update(clientData)
        .where({
          'id': clientData.id
        }).returning('*').then((rows) => rows[0])

      publish('MUTATED', update)
      return update;
    },
    deleteTask: async (obj, args, context, info) => {
      console.log("Delete", args)
      const result = await context.db('tasks').delete()
        .where('id', args.id).returning('*').then((rows) => {
          if (rows[0]) {
            const deletedId = rows[0].id
            publish('DELETED', rows[0])
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
    tasks: {
      subscribe: () => pubSub.asyncIterator('tasks')
    }
  },
}

function publish (actionType, data) {
  pubSub.publish('tasks', {
        tasks: {
          action: actionType,
          task: data
        }
      });
}

module.exports = {
  typeDefs,
  resolvers
}