import React, { useState } from 'react';
import RenderTable from "./Table/RenderTable.jsx";
import Import from './import/import.jsx';

const tabs = {
  transactions : <RenderTable />,
  import : <Import />,
  bonds : '',
}

const UpTabs = () => {
  const [key, setKey] = useState('import');

  const setState = (e) => {
    e.preventDefault();

    setKey(`${e.target.id}`);
  };

  return (
    <>
    <ul className='nav nav-tabs' onClick={setState}>
      {Object.keys(tabs).map((element) =>
        <li className='nav-item' type='submit'>
          <a className={
              `nav-link ${key === element ? 'active' : '' }`
            }
            href='#'
            id={element}
          >
            {element}
          </a>
        </li>
       )}
    </ul>
    <div className='content'>
      {tabs[key]}
    </div>
    </>
  )
};


{/* <div className='tabs' onClick={setState}>
      <div type='button' id="transactions" >Transactions</div>
      <div type='button' id="import" >Import</div> 
      <div type='button' id="bonds" >Bonds</div>
    </div> */}

{/* <Tabs
      activeKey={key}
      onSelect={setState}
      className="mb-3"
    >
      <Tab eventKey="transaction" title="Transaction">
        {<RenderTable link={'transactions'}/>}
      </Tab>
      <Tab eventKey="import" title="Import">
        {<Import />}
      </Tab>
      <Tab eventKey="bonds" title="Bonds">
        {<RenderTable link={'bonds'}/>}
      </Tab>
    </Tabs> */}

export default UpTabs;
