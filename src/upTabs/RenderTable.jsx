import React, { useState, useEffect } from "react";
import axios from "axios";
import { uniqueId } from "lodash";
import RenderPagination from "./RenderPagination.jsx"
import RenderLimitList from "./RenderLimitList.jsx";
import filterData from "./filterData.js";

const RenderTags = ({ tags }) => {
  console.log(tags);
  return (
        <>
        <div className="tags">
        {Object.keys(tags).map((key) => 
          <div className="col" key={key} id={ key.toLowerCase() === 'count' ? 'count' : null }>
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
            typeof value === 'number' 
              ? <div className="col" id="number" key={value}>{value}</div>
              : <div className="col" id="string" key={value}>{value}</div>
          )}
        </div>
        )}
      </>
  )
};

const RenderTable = ({ link }) => {
  const [reqData, setReqData] = useState({ data: [''], page: 1, limit: 25, count: 0 });

  useEffect(() => {
    const { page, limit } = reqData;
    const getData = async () => await axios.get(`http://localhost:8080/${link}?page=${page}&limit=${limit}`)
    .then(({ data }) => setReqData(filterData(data)));
    getData();
  }, [reqData.page, reqData.limit]);

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
  );
};

export default RenderTable;
