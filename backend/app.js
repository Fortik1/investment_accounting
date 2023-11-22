import Express from "express";
import bodyParser from 'body-parser';
import fs from 'fs';
import path from "path";
import _ from "lodash";

export default () => {
  const app = new Express();
  app.use(bodyParser.json());

  app.get('/transactions', (req, res) => {
    const { page, limit } = req.query;
    res.set('Access-Control-Allow-Origin', '*');
    const __dirname = path.resolve();
    const pathToFile = path.join(__dirname, 'backend', 'transactions.json');
    const data = fs.readFileSync(pathToFile, 'utf-8');
    
    const currentLimit = limit && limit > 0 ? limit : 10;
    const dataList = _.chunk(JSON.parse(data), currentLimit);
    const currentPage = Math.min((page && page > 0 ? page : 1), dataList.length - 1);
    const currentDataPage = dataList[currentPage];
    
    const result = {
      limit: Number(currentLimit),
      page: Number(currentPage),
      count: dataList.length - 1,
      data: currentDataPage
    };

    res.send(result);
  });

  return app;
};
