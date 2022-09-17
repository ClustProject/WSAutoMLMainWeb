import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import MetaDataManagementPage from "./MetaDataManagementPage";
import NotFound from "../../error/NotFound";

const DOCUMENT_TITLE = "WS-AutoML 관리자 페이지 | 메타데이터";

const MAIN_TITLE = "메타데이터"
const TAB_NAMES = ["관리"]

export default function MetaDataPage() {
  useEffect(() => {
    document.title = DOCUMENT_TITLE;
  })

  return (
    <Routes>
      <Route path="management" element={
        <MetaDataManagementPage
          mainTitle={MAIN_TITLE}
          tabNames={TAB_NAMES}
        />}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}
