const { pubSub } = require('./pubsub')
const { conflictHandler } = require("@aerogear/voyager-conflicts")

const TASK_ADDED = 'tasks/added'
const TASK_DELETED = 'tasks/deleted'
const TASK_UPDATED = 'tasks/updated'

const typeDefs = `
type Task {
  id: ID!
  version: Int
  title: String!
  description: String!
  status: TaskStatus
}

enum TaskStatus {
  OPEN
  ASSIGNED
  COMPLETE
}

type Query {
  allTasks(first: Int, after: String): [Task],
  getTask(id: ID!): Task
}

type Mutation {
  createTask(title: String!, description: String!, status: TaskStatus): Task
  updateTask(id: ID!, title: String, description: String, version: Int!, status: TaskStatus): Task
  deleteTask(id: ID!): ID
}

type Subscription {
  taskAdded: Task,
  taskDeleted: Task,
  taskUpdated: Task
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
      return await context.db.select()
        .from('tasks')
        .where('id', args.id)
        .then((rows) => rows[0])
    }
  },
  Mutation: {
    createTask: async (obj, args, context, info) => {
      const task = {
        ...args,
        version: 1,
        status: 'OPEN'
      }
      const result = await context.db('tasks')
        .insert(task)
        .returning('*')
        .then((rows) => rows[0])

      pubSub.publish(TASK_ADDED, { taskAdded: result })
      return result
    },
    updateTask: async (obj, args, context, info) => {
      const task = await context.db('tasks')
        .select()
        .where('id', args.id)
        .then((rows) => rows[0])
      
      if (!task) {
        throw new Error(`Invalid ID for task object: ${args.id}`);
      }

      const conflictError = conflictHandler.checkForConflict(task, args);
      if (conflictError) {
        throw conflictError;
      }

      const result = await context.db('tasks')
        .update(args)
        .where('id', args.id)
        .returning('*')
        .then((rows) => rows[0])

      pubSub.publish(TASK_UPDATED, { taskUpdated: result })
      return result;
    },
    deleteTask: async (obj, args, context, info) => {
      const result = await context.db('tasks')
        .delete()
        .where('id', args.id)
        .returning('*')
        .then((rows) => rows[0])

      if (!result) {
        throw new Error(`Cannot delete object ${args.id}`);
      }

      pubSub.publish(TASK_DELETED, { taskDeleted: result })
      return result.id // return just the deleted task's ID
    }
  },
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
  }
}

module.exports = {
  typeDefs,
  resolvers
}