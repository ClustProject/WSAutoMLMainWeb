import React, { useState } from "react";

import { Box } from "@mui/material";
import DataSetCards from "./DataSetCards";
import DataSetCountText from "./DataSetCountText";

export default function DataSetArea(props) {
  const [countDataSet, setCountDataSet] = useState([]); // 검색된 데이터셋의 수
  const {
    searchKeyword,
    setSearchKeyword,
    filters,
    dateRange,
    filteredMetadata,
  } = props;

  return (
    <>
      <Box
        sx={{
          width: "70%",
          marginLeft: "5%",
        }}
      >
        <DataSetCountText
          countDataSet={countDataSet}
          setCountDataSet={setCountDataSet}
        />
        <DataSetCards
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setCountDataSet={setCountDataSet}
          filters={filters}
          dateRange={dateRange}
          filteredMetadata={filteredMetadata}
        />
      </Box>
    </>
  );
}
