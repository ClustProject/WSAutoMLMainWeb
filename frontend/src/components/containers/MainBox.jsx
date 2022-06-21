import Box from "@mui/material/Box";
import React from "react";

export default function MainBox(props) {
  return (
    <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: "#eaeff1"}}>
      {props.content}
    </Box>
  )
}

