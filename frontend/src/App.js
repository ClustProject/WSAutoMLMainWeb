import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import Paperbase from "./components/presentational/Paperbase";
import NotFound from "./error/NotFound";
import MetaDataPage from "./pages/metadata/MetaDataPage";
import UserPage from "./pages/user/UserPage";

function PageTemplate() {
  return (
    <Paperbase>
      <Routes>
        {/* Paperbase에서 props.children으로 들어간다. */}
        <Route path="/dashboard" element={<DashBoardPage/>}/>
        <Route path="/metadata/*" element={<MetaDataPage/>}/>
        <Route path="/user/*" element={<UserPage/>}/>
        <Route path="*" element={<NotFound/>}/>
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
