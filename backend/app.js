import Express from "express";
import bodyParser from 'body-parser';
import getTransactions from "./getTransactions.js";
import getBonds from './getBonds.js';
import cors from 'cors';
import addFile from "./addFile.js";

export default () => {
  const app = new Express();
  app.use(bodyParser.json({ limit: '1mb' }));

  app.use(cors({
    origin: '*'
  }));

  app.get('/transactions', getTransactions);

  app.get('/bonds', getBonds);

  app.post('/addFile', addFile);

  return app;
};
