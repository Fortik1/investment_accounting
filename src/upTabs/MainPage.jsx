import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'


const tabs = {
  Transactions : { path: '/transactions' },
  Import : { path: '/transactions/import'},
  Portfolio : { path: '/portfolio' },
}

const MainPage = () => {
  const { pathname } = useLocation();
  
  return (
    <>
    <ul className='nav nav-tabs'>
      {Object.keys(tabs).map((element) =>
        <li className='nav-item' type='submit'>
          <Link className={`nav-link ${ pathname === tabs[element].path ? 'active' : '' }`}
            to={tabs[element].path}
          >
            {element}
          </Link>
        </li>
       )}
    </ul>
    <Outlet/>
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

export default MainPage;
