import React from "react";

import {Box, Pagination, Stack} from "@mui/material";
import DataSetCards from "./DataSetCards";
import DataSetCountText from "./DataSetCountText";

export default function DataSetArea() {
  return (
    <>
      <Box sx={{
        height: 1000,
        width: '70%',
        marginLeft: '5%',
      }}>
        <DataSetCountText/>
        <DataSetCards/>
        <TemporaryPagination/>
      </Box>
    </>
  );
}

function TemporaryPagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="primary" disabled/>
    </Stack>
  );
}
