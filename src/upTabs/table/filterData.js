import _ from 'lodash';

const normalizDate = (date) => {
  const year = date.slice(0, 4);
  const mounth = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${year}:${mounth}:${day}`;
}

const filterData = (reqData) => {
  const { data } = reqData;
  const firstData = data[0];


  const percentConversionArrayName = ['yield_last', 'yield_avg'];
  data.forEach((el) => {
    percentConversionArrayName.forEach((name) => {
      if (el[name]) el[name] = (el[name] * 100).toFixed(2);
    });
    el['trade_date'] = normalizDate(el['trade_date']);
  });

  // const correctName = {
  //   'isin': 'ISIN',
  //   'name': 'Name',
  //   'price_avg':  `Price (avg)`,
  //   'prire_last': `Price (${firstData.date_last})`,
  //   'yield_avg': 'Yield (avg)',
  //   'yield_last': `Yield (${firstData.date_last})`,
  //   'duration_last': `Duration (${firstData.date_last})`,
  //   'rating': 'Rating',
  //   'broker': 'Broker',
  //   'trade_date': 'Trade Date',
  //   'count': 'Count'
  // };

  // 'broker' : 'Broker',
  //   'count' : 'Count',
  //   'instrument_type' : 'Type',     другой вариант
  //   'isin' : 'ISIN',
  //   'nkd' : 'NKD',
  //   'price' : 'Price',
  //   'summa' : 'Summa',
  //   'trade_date' : 'Trade Date',
  //   'trade_time' : 'Trade Time'

  const correctName = {
    'isin' : 'ISIN',
    'trade_date' : 'Trade Date',
    'count' : 'Quantity',
    'price' : 'Price',
    'summa' : 'Total amount'
  }

  const correctNameArray = Object.keys(correctName);

  const newDataList = data
    .map(el => _.pick(el, correctNameArray))
    .reduce((acc, oldElement) => {
      const newData = {};
      Object.keys(oldElement)
        .map((oldName) => {
          const newName = correctName[oldName];
          newData[newName] = oldElement[oldName];
        });

      acc.push(newData);
      return acc;
    }, []);

  const newData = { ...reqData, data: newDataList };

  return newData;
};

export default filterData;
