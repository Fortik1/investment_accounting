import React, { useState, useEffect } from "react";
import axios from "axios";
import { pick, uniqueId } from "lodash";
import { normalizDate } from "../TableTransactions/filterData";
import BigNumber from "bignumber.js";
import { Nav } from "react-bootstrap";
import FullInformationOnName from "./FullInformationOnName.js";

const replacePoint = (number) => {
  if (number === "NaN") {
    return null;
  } else {
    return number;
  }
};

const getSumAndCountByName = (elements, name) => elements.reduce((acc, element) => {
    if (element[name]) {
      console.log(element, 'out')
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

const nameForInfo = ['accruedCouponEod', 'yieldAvg', 'yieldDaily', 'currentInvestment'];

const widthStyle = {
  "accruedCouponEod": 150,
  "ccy": 50,
  "count": 100,
  "couponPaymentFrequency": 90,
  "dateDaily": 100,
  "duration": 100,
  "isin": 150,
  "maturityDate": 100,
  "name": 120,
  "priceAvg": 90,
  "priceDaily": 150,
  "rating": 50,
  "type": 70,
  "yieldAvg": 90,
  "yieldDaily": 150,
  "currentInvestment": 100
};

const getInfoForLine = (data) => {
  const sumsFunctions = {
    accruedCouponEod: getSumAndCountByName(data, 'accruedCouponEod').sum,
    // yieldAvg: getAvgFromSumFunction(getSumAndCountByName(data, 'yieldAvg')),
    // yieldDaily: getAvgFromSumFunction(getSumAndCountByName(data, 'yieldDaily')),
    // currentInvestment: getSumAndCountByName(data, 'currentInvestment').sum
  };

  return Object.keys(data[0]).map((key) => nameForInfo.includes(key) ? 
    { 
      value: replacePoint(sumsFunctions[key]), 
      styleWidth: widthStyle[key]
    } 
    : { value: null, styleWidth: widthStyle[key]});
};


// accruedCouponEod (нужно умножить на count) он в % -> ((accruedCouponEod / 100) * principal) * count <- сумма нкд

const RenderActiveTypeButtun = ({ activeType, setActiveType }) => {
  const typeList = ['Bond', 'Stock', 'All'];

  return (
    <Nav variant="underline" defaultActiveKey={activeType}>
      {typeList.map((typeName) => 
        <Nav.Item>
          <Nav.Link eventKey={typeName} onClick={() => setActiveType(typeName)}>{typeName}</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  )
};

const RenderInfoLine = ({ info, length }) => {
  return (
    <div className="portfolio-tags-info" style={{ width: length + "px" }}>
      {info.map(({ value, styleWidth }) => 
        <div key={uniqueId()} style={{ width: styleWidth + "px", textAlign: "right" }}>
          { value }
        </div>  
      )}
    </div>
  )
};

const RenderTags = ({ tags, length }) => {
  return (
    <>
      <div className="portfolio-tags" style={{ width: length + "px"}}>
        {tags.map(({ oldName, newName }) =>
          <div key={uniqueId()} style={{ width: widthStyle[oldName] + "px" }} >
            {newName}
          </div>
        )}
      </div>
    </>
  )
};

const RenderBody = ({ body, length }) => {
  return (
    <>
      {body.map((element) =>
        <div className="portfolio-body" key={uniqueId()} style={{ width: length + "px" }}>
          {Object.entries(element).map(([key, value]) =>
            <div key={uniqueId()} style={{ 
              width: widthStyle[key] + "px",
              textAlign: new RegExp(/\d,\d/).test(value) ? "right" : null
            }}>{value}</div>
          )}
        </div>
      )}
    </>
  )
};

const principal = 1000; 

const filterData = (data, currentNames) => data.map((element) => {
  const newData = pick(element, currentNames);
  const nkdName = 'accruedCouponEod';

  newData[nkdName] = element[nkdName] / 100 * principal * element.count || null;
  newData['yieldDaily'] = newData['yieldDaily'] * 100 || null;
  newData['yieldAvg'] = newData['yieldAvg'] * 100 || null;

  Object.keys(element).forEach((key) => {
    if (typeof newData[key] === 'number') {
      newData[key] = newData[key].toFixed(2).replace('.', ',');
    }
  });
  
  return newData;
});

const filterTags = (tags, correctName) => {
  return tags
    .reduce((acc, oldName) => acc = [...acc, { oldName, newName: correctName[oldName] }] ,[]);
}; // 0.04ms

const RenderPortfolio = () => {
  const defaultName = ['name', 'priceAvg', 'priceDaily', 'yieldAvg', 'yieldDaily', 'couponPaymentFrequency', 'type', 'accruedCouponEod', 'count', 'currentInvestment'];

  // const [reqData, setReqData] = useState({ dateDaily: '-' });
  // const [currentNames, setCurrentNames] = useState(defaultName);
  const [loadState, setLoadStete] = useState('load');
  const [activeType, setActiveType] = useState('All');

  const [testClass, setTestClass] = useState(new FullInformationOnName('-'));

  // const correctName = {
  //   'name': "Name", 
  //   'priceAvg': "Price Avg",
  //   'priceDaily': `Price ${reqData.dateDaily}`, 
  //   'yieldAvg': "Yield Avg", 
  //   'yieldDaily': `Yield ${reqData.dateDaily}`,
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

  useEffect(() => {
    const path = 'https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/portfolio';

    (function async () { 
      axios.get(path)
        .then(({ data }) => {
        const newStateClass = new FullInformationOnName(normalizDate(data[0].dateDaily));
        newStateClass.addData(data);
        setTestClass(newStateClass);
        setLoadStete('loaded')
        // setReqData({ // max 3.22 ms
        //   ...reqData, 
        //   data: {
        //     all: filterData (data, currentNames),
        //     bond: filterData(data.filter(({ type }) => type === 'bond'), currentNames),
        //     stock: filterData(data.filter(({ type }) => type === 'stock'), currentNames)
        //   }, 
        //   dateDaily: normalizDate(data[0].dateDaily)
        // })
      });
    }());
  }, []);

  return (
    <>
      {loadState !== 'load' &&
        <>
        <RenderActiveTypeButtun activeType={activeType} setActiveType={setActiveType}/>
        <div className="table">
          <RenderTags tags={ testClass.getTags() } length={ testClass.getLength() } />
          <RenderInfoLine info={ testClass.getInfoForLine(activeType) } length={ testClass.getLength() } />
          <div className="table-body">
             <RenderBody body={ testClass.getData(activeType) } length={ testClass.getLength() } />
          </div>
        </div>
        </>
      }
    </>
  )
};

export default RenderPortfolio;
