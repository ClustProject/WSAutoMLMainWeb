import React from 'react';

import Header from "../presentational/header/Header";
import MainAppBar from "../presentational/appbar/MainAppBar";
import HomeBanner from "../presentational/banner/HomeBanner";
import DataTreeMap from "../presentational/treemap/DataTreeMap";
import {Divider} from "@mui/material";
import ContentMediaCards from "../presentational/cards/ContentMediaCards";

export default function MainPageContainer() {
  return (
    <>
      <Header/>
      <MainAppBar/>
      <HomeBanner/>
      <DataTreeMap/>
      <Divider sx={{
        margin: '25px'
      }}/>
      <ContentMediaCards/>
    </>
  );
}
