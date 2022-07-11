import React from "react";

import {Box} from "@mui/material";
import DataTreeMap from "./DataTreeMap";

export default function Content() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: "center"
      }}>
        <Box sx={{
          width: "80%",
          height: "500px",
        }}>
          <DataTreeMap/>
        </Box>
      </Box>
    </>
  )
}

