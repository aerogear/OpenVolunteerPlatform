import { Config } from './config/config';
import { resolve } from 'path';

const MongoClient = require('mongodb').MongoClient;

export async function connect(config: Config) {
  const url: string = config.db.connection;
  if (process.env.BACKUP_DEMO_DATA === 'true') {
    const backup = require('mongodb-backup');
    backup({
      uri: url,
      root: resolve(__dirname, '../mongodump')
    });
  }

  if (process.env.USE_DEMO_DATA === 'true') {
    const restore = require('mongodb-restore');
    restore({
      uri: url,
      root: resolve(__dirname, '../mongodump/showcase')
    });
  }

  // Use connect method to connect to the server
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(config.db.database);
  return db;
}

