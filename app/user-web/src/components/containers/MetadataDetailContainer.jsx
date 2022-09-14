import React from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import {Box, Container} from "@mui/material";
import Footer from "../presentational/global/footer/Footer";
import MetaDataTable from "../presentational/search/MetaDataTable";

const marginSize = '25px';

function MetadataDetailContainer() {
  return (
    <>
      <Header/>
      <MainAppBar/>

      <Container sx={{
        marginTop: marginSize
      }}>
        <Box sx={{
          display: 'flex',
        }}>
          <MetaDataTable/>
        </Box>
      </Container>

      <Footer/>
    </>
  );
}

export default MetadataDetailContainer;
