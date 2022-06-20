import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import Paperbase from "./components/presentational/dashboard/Paperbase";

function DataPage() {
  return null;
}

function UserPage() {
  return null;
}

function PageTemplate() {
  return (
    <Paperbase>
      {/* Paperbase에서 props.chiled으로 들어간다. */}
      <Routes>
        <Route path="/dashboard" element={<DashBoardPage/>}/>
        <Route path="/data" element={<DataPage/>}/>
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
    </Paperbase>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/*" element={<PageTemplate/>}/>
      </Routes>
    </BrowserRouter>
  );
}
