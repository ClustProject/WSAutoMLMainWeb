import React from 'react';

import Header from "../presentational/header/Header";
import MainAppBar from "../presentational/appbar/MainAppBar";
import HomeBanner from "../presentational/banner/HomeBanner";
import Content from "../presentational/content/Content";

export default function MainPageContainer() {
  return (
    <>
      <Header/>
      <MainAppBar/>
      <HomeBanner/>
      <Content/>
    </>
  );
}
