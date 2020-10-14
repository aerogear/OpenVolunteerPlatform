// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import cors from 'cors';
import express from 'express';
import http from 'http';
import { handler } from "./handler"
const app = express();

app.use(cors());

// TODO use file that is replaced by config map
app.post("/handler", handler)
const httpServer = http.createServer(app);


httpServer.listen({ port: +(process.env.PORT || 8100) }, () => {
  console.log(`🚀  handler ready at http://localhost:8100/handler`);
});
