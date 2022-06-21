import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import UserRoleManagementPage from "./UserRoleManagementPage";

const DOCUMENT_TITLE = "AutoML - 유저";

const MAIN_TITLE = "유저"
const TAB_NAMES = ["권한 관리"]

export default function UserPage() {
  useEffect(() => {
    document.title = DOCUMENT_TITLE;
  })

  return (
    <Routes>
      <Route path="role-management" element={
        <UserRoleManagementPage
          mainTitle={MAIN_TITLE}
          tabNames={TAB_NAMES}
        />}/>
    </Routes>
  )
}
