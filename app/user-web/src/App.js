import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/main/MainPage";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
