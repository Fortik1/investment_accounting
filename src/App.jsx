import React from "react";
import MainPage from './upTabs/MainPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Import from "./upTabs/import/import.jsx";
import RenderTableTransactions from "./upTabs/TableTransactions/RenderTransactions.jsx";
import RenderPortfolio from "./upTabs/TablePortfolio/RenderPortfolio.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainPage/> } >
          <Route path="transactions" element={ <RenderTableTransactions/> } />
          <Route path="transactions/import" element={ <Import/> } />
          <Route path="*" element={ <RenderPortfolio/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
