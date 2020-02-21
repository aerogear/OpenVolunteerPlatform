const MongoClient = require('mongodb').MongoClient;

export async function connect() {
    // TODO config
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'showcase';

    // Use connect method to connect to the server
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    return db;
}

