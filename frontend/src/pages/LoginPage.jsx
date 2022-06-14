import React, {useEffect} from 'react';

import LoginContainer from '../components/containers/LoginContainer'

const TITLE = "AutoML - 로그인";

export default function LoginPage() {

  useEffect(() => {
    document.title = TITLE
  }, []);

  return (
    <>
      <LoginContainer/>
    </>
  );
}
