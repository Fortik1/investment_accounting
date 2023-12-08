import _ from 'lodash';
import list from './transactions.js';


const getData = (limit, page) => {
  const { data } = list;

  const currentLimit = limit && limit > 0 ? limit : 10;
  const dataList = _.chunk(data, currentLimit);
  const currentPage = page - 1 > 0 ? page : 1;
  const currentDataPage = dataList[currentPage - 1 > 0 ? currentPage - 1 : 0];

  const d = {
    limit: Number(currentLimit),
    page: Number(currentPage),
    count: dataList.length,
    data: currentDataPage
  };

  console.log(d);

  return d;
};

export default getData;
