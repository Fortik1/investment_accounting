import React, { useState, useEffect } from "react";
import axios from "axios";
import { uniqueId } from "lodash";
import { normalizDate } from "../TableTransactions/filterData";
import { Nav } from "react-bootstrap";
import FullInformationOnName from "./FullInformationOnName.js";
import RenderSpinner from "../RenderSpinner.jsx";

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
        {tags.map(({ correctName, width }) =>
          <div key={uniqueId()} style={{ width: width + "px" }} >
            {correctName}
          </div>
        )}
      </div>
    </>
  )
};

const RenderBody = ({ body, length, widthStyle }) => {
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

const RenderPortfolio = () => {
  const [loadState, setLoadStete] = useState('load');
  const [activeType, setActiveType] = useState('All');
  const [testClass, setTestClass] = useState(new FullInformationOnName('-'));

  useEffect(() => {
    const path = 'https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/portfolio';

    (function async () { 
      axios.get(path)
        .then(({ data }) => {
        const newStateClass = new FullInformationOnName(normalizDate(data[0].date_daily));
        console.log(data)
        newStateClass.addData(data);
        setTestClass(newStateClass);
        setLoadStete('loaded');
      });
    }());
  }, []);

  if (loadState === 'load') {
    return <RenderSpinner />
  } else {
    return (
      <>
        <RenderActiveTypeButtun activeType={activeType} setActiveType={setActiveType} />
        <div className="table">
          <RenderTags tags={testClass.getTags()} length={testClass.getLength()} />
          <RenderInfoLine info={testClass.getInfoForLine(activeType)} length={testClass.getLength()} />
          <div className="table-body">
            <RenderBody body={testClass.getData(activeType)} length={testClass.getLength()} widthStyle={testClass.getStyleByActiveName()} />
          </div>
        </div>
      </>
    )
  }
};

export default RenderPortfolio;
