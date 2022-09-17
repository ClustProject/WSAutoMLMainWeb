import React, {useEffect} from 'react';
import HomeContainer from "../components/containers/HomeContainer";

const TITLE = "AutoML - 홈";

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
