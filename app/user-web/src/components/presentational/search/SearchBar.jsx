import React from "react";

import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";

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

      <Box sx={{
        width: '20px'
      }}>
      </Box>

      <Button variant="outlined">
        검색
      </Button>
    </Box>
  );
}

