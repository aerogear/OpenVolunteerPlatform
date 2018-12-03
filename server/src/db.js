const knex = require('knex')

async function connect (options) {
  const db = knex({
    client: 'pg',
    connection: options
  })
  const usersExists = await db.schema.hasTable('users')
  if (!usersExists) {
    await db.schema.createTable('users', function (table) {
      table.increments('id')
      table.string('name')
      table.integer('version')
      table.string('dateOfBirth')
    })
  }
  return db
}

module.exports = connect
