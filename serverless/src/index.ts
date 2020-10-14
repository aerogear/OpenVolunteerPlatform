// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import cors from 'cors';
import express from 'express';
import http from 'http';
import { loadDBConfig, connectDB } from './db';
import { handler } from "./handler"
const app = express();

app.use(cors());

const db = connectDB();
const dbConfig = loadDBConfig();

// TODO use file that is replaced by config map
app.post("/handler", handler)
const httpServer = http.createServer(app);


httpServer.listen({ port: 8100 }, () => {
  console.log(`🚀  handler ready at http://localhost:8100/handler`);
});
