import React, { useState, useEffect } from "react";
import axios from "axios";
import { pick, uniqueId } from "lodash";
import { normalizDate } from "../TableTransactions/filterData";

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
  "type": 50,
  "yieldAvg": 90,
  "yieldDaily": 150,
};

// accruedCouponEod (нужно умножить на count) он в % -> ((accruedCouponEod / 100) * principal) * count <- сумма нкд

const RenderTags = ({ tags, length }) => {
  return (
    <>
      <div className="portfolio-tags" style={{ width: length + "px"}}>
        {tags.map(({ oldName, newName }, index) =>
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
          {Object.entries(element).map(([key, value], index) =>
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

const filterTags = (tags, correctName) => Object.keys(tags)
  .reduce((acc, oldName) => acc = [...acc, { oldName, newName: correctName[oldName] }] ,[]); // 0.04ms

const RenderPortfolio = () => {
  const defaultName = ['name', 'priceAvg', 'priceDaily', 'yieldAvg', 'yieldDaily', 'couponPaymentFrequency', 'type', 'accruedCouponEod', 'count'];

  const [reqData, setReqData] = useState({ dateDaily: '-' });
  const [currentNames, setCurrentNames] = useState(defaultName);

  const correctName = {
    'name': "Name", 
    'priceAvg': "Price Avg",
    'priceDaily': `Price ${reqData.dateDaily}`, 
    'yieldAvg': "Yield Avg", 
    'yieldDaily': `Yield ${reqData.dateDaily}`,
    'couponPaymentFrequency': "Coupons",
    'type': "Type",
    'accruedCouponEod': "NKD", // по формуле
    'count': "Count", // выводить досюда 
    'rating': "Rating",
    'ccy': "Ccy",
    'dateDaily': "Daily Date",
    'duration': "Duration",
    'isin': "ISIN",
    'maturityDate': "Maturity Date",
  };

  useEffect(() => {
    const path = 'https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/portfolio';

    (function async () { 
      axios.get(path)
        .then(({ data }) => {
        setReqData({ // max 3.22 ms
          ...reqData, 
          data: filterData(data, currentNames), 
          dateDaily: normalizDate(data[0].dateDaily)
        })
      })
    }());

  }, []);


  const getLength = reqData.data && Object.keys(reqData.data[0]).reduce((acc, e) => acc + widthStyle[e] + 20, 0);

  return (
    <>
      {!!reqData.data &&
        <div className="table">
          <RenderTags tags={filterTags(reqData.data[0], correctName)} length={getLength} />
          <RenderBody body={reqData.data} length={getLength} />
        </div>
      }
    </>
  )
};

export default RenderPortfolio;
