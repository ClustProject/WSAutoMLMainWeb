import React from "react";

import {Box} from "@mui/material";
import IntroduceCommentBox from "./IntroduceCommentBox";
import ClustImageCard from "./ClustImageCard";

export default function HomeBanner() {
  return (
    <Box sx={{
      backgroundColor: "#2c387e",
      height: "350px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center"
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: "center"
      }}>
        <IntroduceCommentBox/>
        <Box sx={{
          margin: "35px"
        }}/>
        <ClustImageCard/>

      </Box>
    </Box>
  );
}

