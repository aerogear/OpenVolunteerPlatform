import { Db, MongoClient } from 'mongodb';

const MongoClient = require('mongodb').MongoClient;
const dbConfig = {
    database: process.env.MONGO_COLLECTION || 'showcase',
    connection: process.env.MONGO_CONNECTION || 'mongodb://user:password@127.0.0.1:27017/showcase'
}

export const createHandler = (db: Db) => {
    return {
        name: "findDailyAction",
        lambda: async function (req: any, res: any) {
            const items = await db.collection("dailyactionplan").find().toArray();

            res.json({
                items,
                offset: 0,
                limit: items.length,
                count: items.length
            });
        }
    }
}
