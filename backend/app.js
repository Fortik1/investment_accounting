import Express from "express";
import bodyParser from 'body-parser';
import getTransactions from "./getTransactions.js";
import getBonds from './getBonds.js';

export default () => {
  const app = new Express();
  app.use(bodyParser.json());

  app.get('/transactions', getTransactions);

  app.get('/bonds', getBonds);

  return app;
};
