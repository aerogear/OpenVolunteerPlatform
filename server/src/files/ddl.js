const PREFIX = require('./schema').PREFIX

async function createTasksTables(db) {
    const fileExist = await db.schema.hasTable(PREFIX)
    if (!fileExist) {
        await db.schema.createTable(PREFIX, function(table) {
            table.string('filename')
            table.string('url')
            table.string('mimetype')
            table.string('encoding')
            table.increments('id')
        })
        // Insert sample file for integration tests
        await db(PREFIX).insert({
            filename: "test.txt",
            url: "/files/test.txt",
            mimetype: "text/plain",
            encoding: "UTF8"
        })
    }
}

module.exports = createTasksTables



