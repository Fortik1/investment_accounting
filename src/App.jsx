import React from "react";
import MainPage from './upTabs/MainPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Import from "./upTabs/import/import.jsx";
import RenderTable from "./upTabs/Table/RenderTable.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainPage/> } >
          <Route path="transactions" element={ <RenderTable/> } />
          <Route path="transactions/import" element={ <Import/> } />
          <Route path="*" element={<div>Bonds</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
