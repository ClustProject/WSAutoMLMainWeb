import React, { useEffect } from "react";
import "./LoginPage.css";

import LoginContainer from "../components/containers/LoginContainer";

const TITLE = "WS-AutoML 관리자 페이지 | 로그인";

export default function LoginPage() {
  useEffect(() => {
    document.title = TITLE;
  }, []);

  return (
    <div className='login-page-background'>
      <LoginContainer />
    </div>
  );
}
