import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import UserRoleManagementPage from "./UserRoleManagementPage";
import NotFound from "../../error/NotFound";

const DOCUMENT_TITLE = "WS-AutoML 관리자 페이지 | 유저 관리";

const MAIN_TITLE = "유저 관리"
const TAB_NAMES = ["권한 관리"]

export default function UserPage() {
  useEffect(() => {
    document.title = DOCUMENT_TITLE;
  })

  return (
    <Routes>
      <Route path="role" element={
        <UserRoleManagementPage
          mainTitle={MAIN_TITLE}
          tabNames={TAB_NAMES}
        />}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}
