const knex = require('knex')

async function connect(options) {
  const db = knex({
    client: 'pg',
    connection: options
  })

  await createTasksTables(db);
  return db
}

async function createTasksTables(db) {
  const tasksExists = await db.schema.hasTable('tasks')
  if (!tasksExists) {
    await db.schema.createTable('tasks', function(table) {
        table.string('title')
        table.string('description')
        table.integer('version') // Required for conflict resolution
        table.increments('id')
        table.string('status')
    })
  }
}

module.exports = connect
