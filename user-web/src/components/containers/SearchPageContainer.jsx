import React from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import {Box, Container, Divider} from "@mui/material";
import SearchBar from "../presentational/search/SearchBar";
import CategorySelectBar from "../presentational/search/CategorySelectBar";

const marginSize = '25px';

export default function SearchPageContainer() {
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
        </Box>
      </Container>
    </>
  );
}
