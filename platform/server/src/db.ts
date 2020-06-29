import { Config } from './config/config';
import e = require('express');
import { resolve } from 'path';

const MongoClient = require('mongodb').MongoClient;

export async function connect(config: Config) {
  // TODO config
  let url: string;

  if (config.db.user && config.db.password) {
    url = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;
  } else {
    url = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`
  }

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

