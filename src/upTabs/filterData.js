import _ from 'lodash';

const getCurrentName = (name, data) => {
  const currentName = {
    'isin': 'ISIN',
    'name': 'Name',
    'price_avg':  `Price (avg)`,
    'prire_last': `Price (${data.date_last})`,
    'yield_avg': 'Yield (avg)',
    'yield_last': `Yield (${data.date_last})`,
    'duration_last': `Duration (${data.date_last})`,
    'rating': 'Rating',
    'broker': 'Broker',
    'tradeDate': 'Trade date',
    'count': 'Count'
  };
  
  if (name === 'getCurrentNameArray') return Object.keys(currentName) //TODO

  return currentName[name];
};

const filterData = (reqData) => {
  const currentNameArray = getCurrentName('getCurrentNameArray', { date_last: 0 }); // TODO
  const { data } = reqData;
  const newDataList = data.map(el => _.pick(el, currentNameArray)); // TODO
  const objectCurrentName = {};
  Object.keys(newDataList[0]).map(el => {
    return objectCurrentName[getCurrentName(el, data[0])] = newDataList[0][el];
  });
  
  newDataList[0] = objectCurrentName;
  
  const newData = { ...reqData, data: newDataList };

  return newData;
};

export default filterData;
