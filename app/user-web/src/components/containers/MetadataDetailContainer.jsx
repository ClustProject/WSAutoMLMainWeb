import React from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import {Box, Container, Divider} from "@mui/material";
import Footer from "../presentational/global/footer/Footer";
import SearchBar from "../presentational/search/SearchBar";
import CategorySelectBar from "../presentational/search/CategorySelectBar";
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
        <SearchBar/>
        <Divider
          variant="middle"
          sx={{
            my: marginSize
          }}/>
        <Box sx={{
          display: 'flex',
        }}>
          <CategorySelectBar/>
          <MetaDataTable/>
        </Box>
      </Container>

      <Footer/>
    </>
  );
}

export default MetadataDetailContainer;
