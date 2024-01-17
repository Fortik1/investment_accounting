import React from 'react';
import NetworkError from './NetworkError.jsx';

const refreshPage = () => {
  window.location.reload();
}

const RenderErrorByCode = (errorName) => {
  switch (errorName) {
    case 'ERR_NETWORK': {
      return <NetworkError refresh={refreshPage}/>
    }
  }
};

export default RenderErrorByCode;
