import { range } from "lodash";
import React from "react";
import { Pagination } from "react-bootstrap";

const getButtonPages = (currentPage, pagesTotal) => {
  let startPage = null;
  let endPage = null;
  
  if (pagesTotal <= 7) {
    startPage = 1;
    endPage = pagesTotal;
  } else if (currentPage <= 3) {
    startPage = 1;
    endPage = 7
  } else if (currentPage + 3 >= pagesTotal) {
    startPage = pagesTotal - 6;
    endPage = pagesTotal;
  } else {
    startPage = currentPage - 3;
    endPage = currentPage + 3;
  }

  const buttonPages = range(startPage, endPage + 1);

  if (buttonPages[1] > 2) buttonPages[1] = null;
  if (buttonPages[buttonPages.length - 2] < pagesTotal - 1) buttonPages[buttonPages.length - 2] = null;

  buttonPages[0] = 1;
  buttonPages[buttonPages.length - 1] = pagesTotal;
  return buttonPages;
};

const RenderPagination = ({ reqData, setReqData }) => {
  const { page, count } = reqData;

  const prev = () => {if (page > 1) setReqData({ ...reqData, page: page - 1 })};
  const next = () => {if (page !== count) setReqData({ ...reqData, page: page + 1 })};
  const setToPage = (i) => setReqData({ ...reqData, page: i }); 
  
  const buttonPages = getButtonPages(page, count);


  return ( // TODO
    <Pagination>
      <Pagination.Prev onClick={prev} />
        {buttonPages.map((num) => {
          if (num === null) {
            return <Pagination.Ellipsis/>
          } else {
            return <Pagination.Item active={ page === num ? true : null } onClick={() => setToPage(num)}>{num}</Pagination.Item>
          }
        })}
      <Pagination.Next onClick={next} />
    </Pagination>
  )
};

export default RenderPagination;
