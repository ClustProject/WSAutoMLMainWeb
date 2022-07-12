import React from "react";

import {Box} from "@mui/material";
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
      </Box>
    </>
  );
}
