import React from "react";

import {Box} from "@mui/material";
import LinkBoxes from "./LinkBoxes";

export default function Footer() {
  return (
    <Box sx={{
      backgroundColor: '#2a3eb1',
      height: '400px',
    }}>
      <LinkBoxes/>
    </Box>
  );
}

