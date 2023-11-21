import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import RenderTable from "./RenderTable.jsx";

export default () => {
  const [data, setData] = useState();

  const getData = async () => {
    await axios.get('http://localhost:8080/transactions')
    .then(({data}) => setData(data));
  }
  console.log(data);

  return (
    <div>
      <button onClick={() => getData()}>Показать</button>
      {data && 
        <RenderTable data={data} />
      }
    </div>
  )
};
