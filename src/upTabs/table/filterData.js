import _ from 'lodash';
const filterData = (reqData) => {
  const { data } = reqData;
  const firstData = data[0];


  const percentConversionArrayName = ['yield_last', 'yield_avg'];
  data.forEach((el) => {
    percentConversionArrayName.forEach((name) => {
      if (el[name]) el[name] = (el[name] * 100).toFixed(2);
    });
  });

  const correctName = {
    'isin': 'ISIN',
    'name': 'Name',
    'price_avg':  `Price (avg)`,
    'prire_last': `Price (${firstData.date_last})`,
    'yield_avg': 'Yield (avg)',
    'yield_last': `Yield (${firstData.date_last})`,
    'duration_last': `Duration (${firstData.date_last})`,
    'rating': 'Rating',
    'broker': 'Broker',
    'tradeDate': 'Trade date',
    'count': 'Count'
  };

  const correctNameArray = Object.keys(correctName);
  const newDataList = data
  .map(el => _.pick(el, correctNameArray));

  const newFirstData = {};
  const oldFirstData = newDataList[0];

  Object.keys(oldFirstData)
  .map((oldName) => {
    const newName = correctName[oldName];
    newFirstData[newName] = oldFirstData[oldName];
  });

  newDataList[0] = newFirstData;

  const newData = { ...reqData, data: newDataList };

  return newData;
};

export default filterData;
