import React, { useState, useEffect } from "react";
import axios from "axios";
import { uniqueId } from "lodash";
import RenderPagination from "../RenderPagination.jsx"
import RenderLimitList from "../RenderLimitList.jsx";
import filterData from "./filterData.js";
import RenderSpinner from "../RenderSpinner.jsx";

const getStyle = (key) => {
  switch (key.toLowerCase()) {
    case 'quantity':
      return 'rigthContent';
    case 'price':
      return 'rigthContent';
    case 'total amount':
      return 'rigthContent';
    default:
      return 'leftContent';
  }
};


const RenderTags = ({ tags }) => {
  return (
        <>
        <div className="tags">
        {Object.keys(tags).map((key) => 
          <div className={ getStyle(key) } key={uniqueId()}>
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
        <div className="body" key={uniqueId()}>
          {Object.entries(element).map(([key, value]) => 
            <div className={ getStyle(key) } key={uniqueId()}>{value}</div>
          )}
        </div>
        )}
      </>
  )
};

const RenderTableTransactions = () => {
  const [loadState, setLoadState] = useState('load');
  const [reqData, setReqData] = useState({ page: 1, limit: 25, });

  useEffect(() => {
    setLoadState('load');
    
    const { page, limit } = reqData;
    const path = `https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/transactions?limit=${limit}&page=${page}`;
    //const path = `http://localhost:8080/transactions?page=${page}&limit=${limit}`; // local
    const getData = async () => await axios.get(path)
    .then(({ data }) => {
      !!data.data && setReqData(filterData(data))
      setLoadState('loaded');
    }); // может стоит заменить на то,
    getData();                                                        // как делали на ноде в яндексе
  }, [reqData.page, reqData.limit]);

  if (loadState === 'load') {
    return <RenderSpinner />
  } else {
    return (
      <>
        <div className="table">
          <RenderTags tags={reqData.data[0]}/>
          <RenderBody body={reqData.data} />
        </div>
        <div className="pagination-limit">
          {reqData.data.length !== 0 && 
            <tr>
              <th><RenderLimitList reqData={reqData} setReqData={setReqData} /></th>
              <th><RenderPagination reqData={reqData} setReqData={setReqData} /></th>
            </tr>}
        </div>
      </>
    )
  }
};

export default RenderTableTransactions;
