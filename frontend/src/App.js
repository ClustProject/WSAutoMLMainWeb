import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function DashBoardPage() {
  return <>
    <div>
      ToDo: 개발 예정...
    </div>
  </>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashBoardPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
