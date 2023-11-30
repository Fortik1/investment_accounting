import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import RenderTable from "./table/RenderTable.jsx";

const UpTabs = () => {
  const [key, setKey] = useState('');

  const setState = (k) => key === k ? setKey('') : setKey(k);

  return (
    <Tabs
      activeKey={key}
      onSelect={setState}
      className="mb-3"
    >
      <Tab eventKey="transaction" title="Transaction">
        <RenderTable link={'transactions'}/>
      </Tab>
      <Tab eventKey="import" title="Import">

      </Tab>
      <Tab eventKey="bonds" title="Bonds">
        <RenderTable link={'bonds'}/>
      </Tab>
    </Tabs>
  )
};

export default UpTabs;
