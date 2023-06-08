import React, { useState } from "react";
import Header from "../presentational/global/header/Header";
import MainAppBar from "../presentational/global/appbar/MainAppBar";
import { Box, Container, Divider } from "@mui/material";
import SearchBar from "../presentational/search/SearchBar";
import CategorySelectBar from "../presentational/search/CategorySelectBar";
import DataSetArea from "../presentational/search/DataSetArea";
import Footer from "../presentational/global/footer/Footer";
import SelectedFilters from "../presentational/search/SelectedFilters";

const marginSize = "15px";

export default function SearchPageContainer() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredMetadata, setFilteredMetadata] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const removeFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  return (
    <>
      <Header />
      <MainAppBar />

      <Container
        sx={{
          marginTop: marginSize,
        }}
      >
        <SearchBar onSearch={setSearchKeyword} />
        <SelectedFilters filters={filters} removeFilter={removeFilter} />
        <Divider
          variant='middle'
          sx={{
            my: marginSize,
          }}
        />
        <Box
          sx={{
            display: "flex",
            direction: "column",
          }}
        >
          <CategorySelectBar
            searchKeyword={searchKeyword}
            filters={filters}
            setFilters={setFilters}
            dateRange={dateRange}
            setDateRange={setDateRange}
            setFilteredMetadata={setFilteredMetadata}
          />
          <DataSetArea
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            filters={filters}
            dateRange={dateRange}
            filteredMetadata={filteredMetadata}
          />
        </Box>
      </Container>

      <Footer />
    </>
  );
}
