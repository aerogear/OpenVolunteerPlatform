const knex = require('knex')

async function connect (options) {
  const db = knex({
    client: 'pg',
    connection: options
  })
  const tasksExists = await db.schema.hasTable('tasks')
  if (!tasksExists) {
    await db.schema.createTable('tasks', function (table) {
      table.string('title')
      table.string('description')
      // Required for conflict resolution
      table.integer('version')
      table.increments('id')
    })
  }
  return db
}

module.exports = connect
