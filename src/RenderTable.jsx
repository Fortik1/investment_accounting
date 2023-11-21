import React, { useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { uniqueId } from "lodash";

const RenderTags = ({ tags }) => {
  return (
    <thead>
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
    <tbody>
      {body.map((element) => 
        <tr key={uniqueId()}>
          {Object.values(element).map((value) => 
            <td key={value}>{value}</td>
          )}
        </tr>)}
    </tbody>
  )
};

export default () => {
  const [data, setData] = useState();

  const getData = async () => {
    await axios.get('http://localhost:8080/transactions')
    .then(({data}) => setData(data));
  };
  getData();

  console.log(data);

  return (
    <>
      <Table striped bordered variant="cdcdcd">
        {data && <RenderTags tags={data[0]}/>}
        {data && <RenderBody body={data}/>}
      </Table>
    </>
  )
};
