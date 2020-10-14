const MongoClient = require('mongodb').MongoClient;
const dbConfig = {
    database: process.env.MONGO_COLLECTION || 'showcase',
    connection: process.env.MONGO_CONNECTION || 'mongodb://user:password@127.0.0.1:27017/showcase'
}

export const handler = async function (req: any, res: any) {
    const client = await MongoClient.connect(dbConfig.connection, { useUnifiedTopology: true });
    const db = client.db(dbConfig.database);
    const items = await db.collection("dailyactionplan").find().toArray();
    
    res.json({
        items, 
        offset: 0,
        limit: items.length,
        count: items.length
    });
};
