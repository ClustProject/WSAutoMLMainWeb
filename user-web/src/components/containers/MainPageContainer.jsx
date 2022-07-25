import React from 'react';

import {Divider} from "@mui/material";

import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import HomeBanner from "../presentational/main/banner/HomeBanner";
import DataTreeMap from "../presentational/main/treemap/DataTreeMap";
import ContentMediaCards from "../presentational/main/cards/ContentMediaCards";
import Footer from "../presentational/global/footer/Footer";

export default function MainPageContainer() {
  return (
    <>
      <Header/>
      <MainAppBar/>
      <HomeBanner/>
      <DataTreeMap/>
      <Divider sx={{
        mx: '15%',
        marginTop: '35px',
        marginBottom: '25px',
      }}/>;
      <ContentMediaCards/>
      <Footer/>
    </>
  );
}
