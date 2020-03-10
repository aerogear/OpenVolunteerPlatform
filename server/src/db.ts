import { Config } from './config/config';
import e = require('express');

const MongoClient = require('mongodb').MongoClient;

export async function connect(config: Config) {
    // TODO config
    let url: string;

    if (config.db.user && config.db.password) {
      url = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;
    } else {
      url = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`
    }

    // Use connect method to connect to the server
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(config.db.database);
    return db;
}

