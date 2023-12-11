import React from "react";
import MainPage from './upTabs/MainPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Import from "./upTabs/import/import.jsx";
import RenderTableTransactions from "./upTabs/Table/RenderTableTransactions.jsx";
import RenderTablePortfolio from "./upTabs/Table/RenderTablePortfolio.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainPage/> } >
          <Route path="transactions" element={ <RenderTableTransactions/> } />
          <Route path="transactions/import" element={ <Import/> } />
          <Route path="*" element={ <RenderTablePortfolio/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
