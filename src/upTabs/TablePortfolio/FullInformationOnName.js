import { pick } from "lodash";

class FullInformationOnName {
  constructor(date) {
    this.informations = {
      "name": {
        correctName: "Name",
        width: 120
      }, 
      "priceAvg": {
        correctName: "Price Avg",
        width: 90
      },
      "priceDaily": {
        correctName: `Price ${date}`,
        width: 150
      },
      "yieldAvg": {
        correctName: "Yield Avg",
        width: 90,
      },
      "yieldDaily": {
        correctName: `Yield ${date}`,
        width: 150
      },
      "couponPaymentFrequency": {
        correctName: "Coupons",
        width: 90
      },
      "type": {
        correctName: "Type",
        width: 70
      },
      "accruendCouponEod": {
        correctName: "NKD",
        width: 150
      },
      "count": {
        correctName: "Count",
        width: 100
      },
      "currentInverstment": {
        correctName: "CI",
        width: 100
      },
      "rating": {
        correctName: "Rating",
        width: 50
      },
      "ccy": {
        correctName: "Ccy",
        width: 50
      },
      "dateDaily": {
        correctName: "Daily Date",
        width: 100
      },
      "duration": {
        correctName: "Duration",
        width: 100
      },
      "isin": {
        correctName: "ISIN",
        width: 150
      },
      "maturityDate": {
        correctName: "Maturity Date",
        width: 100
      },
      'activeType': ['name', 'priceAvg', 'priceDaily', 'yieldAvg', 'yieldDaily', 'couponPaymentFrequency', 'type', 'accruedCouponEod', 'count', 'currentInvestment'],
    };
  }

  addData(data) {
    this.informations.data = data.reduce((acc, element) => {
      const { type } = element;
      acc[type].push(element);
      acc.all.push(element);
      return acc;
    }, { all: [], bond: [], stock: [] });
    this.principal = 1000;
  }

  getData(type) {
    return this.informations.data[type].map((element) => {
      const filterData = pick(element, this.informations.activeType);
      const nkdName = 'accruedCouponEod';

      filterData[nkdName] = element[nkdName] / 100 * this.principal * element.count || null;
      filterData['yieldDaily'] = filterData['yieldDaily'] * 100 || null;
      filterData['yieldAvg'] = filterData['yieldAvg'] * 100 || null;
      
      Object.keys(element).forEach((key) => {
        if (typeof filterData[key] === 'number') {
          filterData[key] = filterData[key].toFixed(2).replace('.', ',');
        }
      });

      return filterData;
    });
  }
}

export default FullInformationOnName;

// const widthStyle = {
//   "accruedCouponEod": 150,
//   "ccy": 50,
//   "count": 100,
//   "couponPaymentFrequency": 90,
//   "dateDaily": 100,
//   "duration": 100,
//   "isin": 150,
//   "maturityDate": 100,
//   "name": 120,
//   "priceAvg": 90,
//   "priceDaily": 150,
//   "rating": 50,
//   "type": 70,
//   "yieldAvg": 90,
//   "yieldDaily": 150,
//   "currentInvestment": 100
// };
// const correctName = {
//   'name': "Name", 
//   'priceAvg': "Price Avg",
//   'priceDaily': `Price`, // + date
//   'yieldAvg': "Yield Avg", 
//   'yieldDaily': `Yield`, // + date
//   'couponPaymentFrequency': "Coupons",
//   'type': "Type",
//   'accruedCouponEod': "NKD", // по формуле
//   'count': "Count",  
//   'currentInvestment': "CI", // выводить досюда
//   'rating': "Rating",
//   'ccy': "Ccy",
//   'dateDaily': "Daily Date",
//   'duration': "Duration",
//   'isin': "ISIN",
//   'maturityDate': "Maturity Date",
// };