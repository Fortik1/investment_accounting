import React from "react";
import { Table } from "react-bootstrap";
import { uniqueId } from "lodash";

export default ({ data }) => {
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

  return (
    <>
      <Table striped bordered variant="cdcdcd">
        {<RenderTags tags={data[0]}/>}
        {<RenderBody body={data}/>}
      </Table>
    </>
  )
};
