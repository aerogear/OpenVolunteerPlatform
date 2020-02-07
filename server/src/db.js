const knex = require('knex')
const createTasksTables = require("./tasks/ddl")

async function connect(options) {
  const db = knex({
    client: 'pg',
    connection: options
  })

  await createTasksTables(db);
  return db
}

module.exports = connect
