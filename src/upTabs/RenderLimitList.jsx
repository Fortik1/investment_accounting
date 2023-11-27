import React from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

const RenderLimitList = ({ reqData, setReqData }) => {
  const { limit } = reqData;
  const limitList = [10, 25, 50];

  const setLimit = (newLim) => setReqData({ ...reqData, limit: newLim }); 

  return (
    <>
      <DropdownButton
        className="pagination"
        as={ButtonGroup}
        key={limit}
        id='button-customs'
        variant="white"
        title={limit}
      >
        {limitList.map((variantLimit) => 
          <Dropdown.Item 
            eventKey={variantLimit} 
            onClick={() => setLimit(variantLimit)} 
            active={variantLimit === limit}
          >
            {variantLimit}
          </Dropdown.Item>)}
      </DropdownButton>
    </>
  )
};

export default RenderLimitList;
