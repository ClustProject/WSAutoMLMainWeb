import React from "react";

import {Box, TextField} from "@mui/material";

export default function SearchBar() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <TextField
        label="찾을 데이터를 검색해주세요."
        sx={{
          width: '85%',
        }}
      />
    </Box>
  );
}

