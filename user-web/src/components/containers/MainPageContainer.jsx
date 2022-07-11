import React from 'react';

import Header from "../presentational/header/Header";
import MainAppBar from "../presentational/appbar/MainAppBar";
import HomeBanner from "../presentational/banner/HomeBanner";

export default function MainPageContainer() {
  return (
    <>
      <Header/>
      <MainAppBar/>
      <HomeBanner/>
    </>
  );
}

