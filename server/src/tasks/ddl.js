

async function createTasksTables(db) {
    const tasksExists = await db.schema.hasTable('tasks')
    if (!tasksExists) {
        await db.schema.createTable('tasks', function(table) {
            table.string('title')
            table.string('description')
            // Required for conflict resolution
            table.integer('version')
            table.increments('id')
        })
    }
}

module.exports = createTasksTables



