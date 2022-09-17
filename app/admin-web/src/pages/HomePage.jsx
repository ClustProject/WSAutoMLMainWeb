import React, {useEffect} from 'react';
import HomeContainer from "../components/containers/HomeContainer";

const TITLE = "WS-AutoML 관리자 페이지 | 홈";

function HomePage() {

  useEffect(() => {
    document.title = TITLE
  }, []);

  return (
    <>
      <HomeContainer/>
    </>
  );
}

export default HomePage;
