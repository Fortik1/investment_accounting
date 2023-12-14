import React, { useState, useEffect } from "react";
import axios from "axios";
import { uniqueId } from "lodash";

const RenderTags = ({ tags }) => {
  return (
    <>
      <div className="portfolio-tags">
        {Object.keys(tags).map((key) => 
          <div key={uniqueId()}>
            {key}
          </div>
        )}
      </div>
    </>
  )
};

const RenderBody = ({ body }) => {
  return (
    <>
      {body.map((element) => 
        <div className="portfolio-body" key={uniqueId()}>
          {Object.entries(element).map(([key, value]) => 
            <div key={uniqueId()}>{value}</div>
          )}
        </div>
      )}
    </>
  )
};

const RenderPortfolio = () => {
  const [reqData, setReqData] = useState('');

  useEffect(() => {
    const path = 'https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/portfolio';

    const getPortfolio = async () => await axios.get(path)
      .then(({ data }) => setReqData(data));

    getPortfolio();
  }, [reqData.limit, reqData.page]);

  return (
    <>
      { !!reqData && 
        <div className="portfolio-table">
          <RenderTags tags={reqData[0]} />
          <RenderBody body={reqData} />
        </div>
      }
    </>
  )
};

export default RenderPortfolio;
