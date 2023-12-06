import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import list from './transactions.js';


const getData = (limit, page) => {
  const { data } = list;

  const currentLimit = limit && limit > 0 ? limit : 10;
  const dataList = _.chunk(data, currentLimit);
  const currentPage = Math.min((page && page > 0 ? page : 1), dataList.length - 1);
  const currentDataPage = dataList[currentPage > 0 ? currentPage : 0];

  return {
    limit: Number(currentLimit),
    page: Number(currentPage) || 1,
    count: dataList.length - 1 || 1,
    data: currentDataPage
  };
};

export default getData;
