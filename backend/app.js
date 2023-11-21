import Express from "express";
import bodyParser from 'body-parser';
import fs from 'fs';
import path from "path";

export default () => {
  const app = new Express();
  app.use(bodyParser.json());

  app.get('/transactions', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const __dirname = path.resolve();
    const pathToFile = path.join(__dirname, 'backend', 'transactions.json');
    const data = fs.readFileSync(pathToFile, 'utf-8');
    res.send(data);
  });

  return app;
};
