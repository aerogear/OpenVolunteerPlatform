const { pubSub } = require('../subscriptions')
const { gql } = require('apollo-server')
const { conflictHandler } = require("@aerogear/voyager-conflicts")
const { TASKS_SUBSCRIPTION_KEY } = require("./subscriptions")

const typeDefs = `
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
`

const PUSH_ALIAS = 'cordova';

const taskResolvers = {
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
      const result = await context.db('tasks').insert({
        ...args,
        version: 1
      }).returning('*').then((rows) => rows[0])
      // TODO context helper for publishing subscriptions in SDK?
      // TODO move from passing pushClient in context and use boolean to push or not here
      publish('CREATED', result, context.pushClient)
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
  }
}

function publish(actionType, data, pushClient) {
  if (pushClient) {
    pushClient.sender.send({
      alert: `New task: ${data.title}`,
      userData: {
        title: data.title,
        message: actionType
      }
    },
      {
        criteria: {
          alias: [PUSH_ALIAS]
        }
      }).then((response) => {
        console.log("Notification sent, response received ", response);
      }).catch((error) => {
        console.log("Notification not sent, error received ", error)
      })
  }
  pubSub.publish(TASKS_SUBSCRIPTION_KEY, {
    tasks: {
      action: actionType,
      task: data
    }
  });
}

module.exports = {
  taskResolvers: taskResolvers,
  taskTypeDefs: typeDefs
}