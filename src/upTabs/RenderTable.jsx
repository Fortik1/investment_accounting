import React, { useState, useEffect } from "react";
import axios from "axios";
import { uniqueId } from "lodash";
import RenderPagination from "./RenderPagination.jsx"
import RenderLimitList from "./RenderLimitList.jsx";

const RenderTags = ({ tags }) => {
  return (
        <>
        <div className="tags">
        {Object.keys(tags).map((key) => 
          <div className="col" key={key}>
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
          {Object.values(element).map((value) => 
            typeof value === 'number' 
              ? <div className="col" id="number" key={value}>{value}</div>
              : <div className="col" id="string" key={value}>{value}</div>
          )}
        </div>
        )}
      </>
  )
};

export default () => {
  const [reqData, setReqData] = useState({ data: [''], page: 1, limit: 25, count: 0 });

  useEffect(() => {
    const { page, limit } = reqData;
    const getData = async () => await axios.get(`http://localhost:8080/transactions?page=${page}&limit=${limit}`)
    .then(({ data }) => setReqData(data));
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











{/* 


const RenderTags = ({ tags }) => {
  return (
    <thead className="thead scroll-table">
      <tr>
        {Object.keys(tags).map((key) => 
          <th key={key}>
            {key}
          </th>
        )}
      </tr>
    </thead>
  )
};




const RenderBody = ({ body }) => {
  return (
    <tbody className="tbody">
      {body.map((element) => 
        <tr key={uniqueId()}>
          {Object.values(element).map((value) => 
            <td key={value}>{value}</td>
          )}
        </tr>)}
    </tbody>
  )
};




<div class="scroll-table">
	      <table>
          <RenderTags tags={reqData.data[0]} />
	      </table>	
	      <div class="scroll-table-body">
		      <table>
            <RenderBody body={reqData.data} />
		      </table>
	      </div>	
      </div>
      <br /> */}

{/* <table className="table">
        <RenderTags tags={reqData.data[0]} />
        <RenderBody body={reqData.data} />
      </table> */}
