import React from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import {Box, Container} from "@mui/material";
import Footer from "../presentational/global/footer/Footer";
import MetaDataTable from "../presentational/search/MetaDataTable";
import MetaDataDownloadButton from "../presentational/search/MetaDataDownloadButton";
import MetaDataInfoBox from "../presentational/search/MetaDataInfoBox";

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
          display: "flex",
          fontWeight: "bold",
          marginBottom: "15px"
        }}>
          <MetaDataInfoBox/>
          <MetaDataDownloadButton/>
        </Box>
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
