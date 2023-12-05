import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import list from './transactions.js';


const getData = (fileName, limit, page) => {
  const { data } = list;

  const currentLimit = limit && limit > 0 ? limit : 10;
  const dataList = _.chunk(data, currentLimit);
  const currentPage = Math.min((page && page > 0 ? page : 1), dataList.length - 1);
  const currentDataPage = dataList[currentPage];

  console.log({
    limit: Number(currentLimit),
    page: Number(currentPage),
    count: dataList.length - 1,
    data: currentDataPage
  });
};

export default getData;
