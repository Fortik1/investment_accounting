import { pick } from "lodash";
import BigNumber from "bignumber.js";
import { chunk } from "lodash";

const normalizeNumber = (number) => {
  const splitName = number.split(',');
  const reverse = [...splitName[0]].reverse().join('');
  const secondNumber = splitName[1] || 0;
  const normNumber = chunk(reverse, 3).reverse().map((num) => num.reverse().join('')).join(' ') + ',' + secondNumber;
  return normNumber;
} 

const getSumAndCountByName = (elements, name) => elements.reduce((acc, element) => {
  if (element[name]) {
    element[name] = element[name].split(' ').join('');
    const sumBigNumber = new BigNumber(acc.sum);
    acc.sum = sumBigNumber.plus(Number(element[name].replace(',', '.'))).toString();
    acc.count += 1;
  }

  return acc;
}, { sum: 0, count: 0 });

const getAvgFromSumFunction = ({ sum, count }) => {
const bigSum = new BigNumber(sum);
return bigSum.div(count).toFixed(2);
};

class FullInformationOnName {
  constructor(date) {
    this.date = date;
    this.informations = {
      "name": {
        correctName: "Name",
        width: 120
      }, 
      "price_avg": {
        correctName: "Price Avg",
        width: 90
      },
      "price_daily": {
        correctName: `Price ${this.date}`,
        width: 150
      },
      "yield_instrument_avg": {
        correctName: "Yield Avg",
        width: 90,
      },
      "yield_instrument_daily": {
        correctName: `Yield ${this.date}`,
        width: 150
      },
      "coupon_payment_frequency": {
        correctName: "Coupons",
        width: 90
      },
      "instrument_type": {
        correctName: "Type",
        width: 70
      },
      "accrued_coupon_eod": {
        correctName: "NKD",
        width: 170
      },
      "count": {
        correctName: "Count",
        width: 100
      },
      "current_investment": {
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
      "date_daily": {
        correctName: "Daily Date",
        width: 100
      },
      "duration_daily": {
        correctName: "Duration",
        width: 100
      },
      "isin": {
        correctName: "ISIN",
        width: 150
      },
      "maturity_date": {
        correctName: "Maturity Date",
        width: 100
      },
      'activeType': ['name', 'price_avg', 'price_daily', 'yield_instrument_avg', 'yield_instrument_daily', 'coupon_payment_frequency', 'instrument_type', 'accrued_coupon_eod', 'count', 'current_investment'],
    };
  }

  addData(data) {
    this.informations.data = data.reduce((acc, element) => {
      const { instrument_type } = element;
      acc[instrument_type].push(element);
      acc.all.push(element);
      return acc;
    }, { all: [], bond: [], stock: [] });
    this.principal = 1000;
  }

  setDate(date) {
    this.date = date;
    return this;
  }

  getStyleByActiveName() {
    return this.informations.activeType.reduce((styleWidth, name) => {
      const { width } = this.informations[name];
      return { ...styleWidth, [name]: width };
    }, {})
  }

  getData(type) {
    type = type.toLowerCase();
    if (!this.informations.data) {
      return null;
    };

    return this.informations.data[type].map((element) => {
      const filterData = pick(element, this.informations.activeType);
      const nkdName = 'accrued_coupon_eod';

      filterData[nkdName] = element[nkdName] / 100 * this.principal * element.count || null;
      filterData['yield_instrument_daily'] = filterData['yield_instrument_daily'] * 100 || null;
      filterData['yield_instrument_avg'] = filterData['yield_instrument_avg'] * 100 || null;
      
      Object.keys(element).forEach((key) => {
        if (key === 'count') {
          filterData[key]= normalizeNumber(`${filterData[key]},0`).split(',')[0]
        } else if (typeof filterData[key] === 'number') {
          const number = filterData[key].toFixed(2).replace('.', ',');
          filterData[key] = normalizeNumber(number);
        }
      });
      return filterData;
    });
  }

  getLength() {
    return this.informations.activeType
      .reduce((sumWidth, name) => sumWidth + this.informations[name].width + 20, 0);
  }

  getTags() {
    return this.informations.activeType
      .reduce((tags, tagName) => {
        tags.push(this.informations[tagName]);
        return tags;
      }, []);
  }

  getInfoForLine(type) {
    type = type.toLowerCase();
    const data = this.getData(type);
    const nameForInfo = ['accrued_coupon_eod', 'yield_instrument_avg', 'yield_instrument_daily', 'current_investment'];
    const sumsFunctions = {
      accrued_coupon_eod: getSumAndCountByName(data, 'accrued_coupon_eod').sum,
      yield_instrument_avg: getAvgFromSumFunction(getSumAndCountByName(data, 'yield_instrument_avg')),
      yield_instrument_daily: getAvgFromSumFunction(getSumAndCountByName(data, 'yield_instrument_daily')),
      current_investment: getSumAndCountByName(data, 'current_investment').sum
    }

    return this.informations.activeType.map((name) => {
      const styleWidth = this.informations[name].width;
      if (nameForInfo.includes(name)) {
        return {
          value: sumsFunctions[name] === 'NaN' ? null : normalizeNumber(`${sumsFunctions[name]}`.replace('.', ',')),
          styleWidth
        } 
      } else {
        return {
          value: null,
          styleWidth
        }
      }
    });
    // return Object.keys(data[0]).map((key) => nameForInfo.includes(key) ?
    //   {
    //     value: sumsFunctions[key] === 'NaN' ? null : sumsFunctions[key],
    //     styleWidth: this.informations[key].width
    //   }
    //   : { value: null, styleWidth: this.informations[key].width }
    // )
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