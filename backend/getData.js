import fs from 'fs';
import path from 'path';
import _ from 'lodash';


const getData = (fileName, limit, page) => {
  const __dirname = path.resolve();
  const pathToFile = path.join(__dirname, 'backend', fileName);
  const data = fs.readFileSync(pathToFile, 'utf-8');

  const currentLimit = limit && limit > 0 ? limit : 10;
  const dataList = _.chunk(JSON.parse(data), currentLimit);
  const currentPage = Math.min((page && page > 0 ? page : 1), dataList.length - 1);
  const currentDataPage = dataList[currentPage];

  return {
    limit: Number(currentLimit),
    page: Number(currentPage),
    count: dataList.length - 1,
    data: currentDataPage
  };
};

export default getData;
