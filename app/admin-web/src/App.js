import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PaperBase from "./components/presentational/PaperBase";
import NotFound from "./error/NotFound";
import MetaDataPage from "./pages/metadata/MetaDataPage";
import UserPage from "./pages/user/UserPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function PageTemplate() {
  return (
    <PaperBase>
      <Routes>
        {/* PaperBase에서 props.children으로 들어간다. */}
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/metadata/*" element={<MetaDataPage/>}/>
        <Route path="/user/*" element={<UserPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </PaperBase>
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
