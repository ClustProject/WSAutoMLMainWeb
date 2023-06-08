import React, { useState } from "react";

import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function SearchBar({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어

  const handleSearchClick = () => {
    onSearch(searchKeyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        label='찾을 데이터를 검색해주세요.'
        sx={{
          width: "85%",
        }}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Box sx={{ width: "20px" }}></Box>

      <Button variant='outlined' onClick={handleSearchClick}>
        검색
      </Button>
    </Box>
  );
}
