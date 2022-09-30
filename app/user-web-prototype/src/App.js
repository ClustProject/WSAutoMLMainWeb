import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/main/MainPage";
import SearchPage from "./pages/search/SearchPage";
import MetadataDetailPage from "./pages/metadata/MetadataDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/metadata/1" element={<MetadataDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
