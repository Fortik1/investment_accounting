import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import RenderTable from "./RenderTable.jsx";

export default () => {
  const [key, setKey] = useState('');

  const setState = (k) => {
    if (key === k) {
      setKey('');
    } else {
      setKey(k);
    }
  };

  return (
    <Tabs
      activeKey={key}
      onSelect={setState}
      className="mb-3"
    >
      <Tab eventKey="transactio" title="Table">
          <RenderTable />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
    </Tabs>
  )
};
