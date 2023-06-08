import React from "react";
import { Box, Chip } from "@mui/material";

const categoryNameKoreanEnglishMap = {
  domain: "도메인",
  theme: "주제",
  organization: "기관",
  timeUnit: "시간단위",
};

const SelectedFilters = ({ filters, removeFilter }) => {
  return (
    <Box sx={{ marginTop: "0.5em" }}>
      {filters.map((filter, index) => {
        const [category, value] = Object.entries(filter)[0];
        const categoryKorean =
          categoryNameKoreanEnglishMap[category] || category;

        return (
          <Chip
            key={`${category}-${value}-${index}`}
            label={`${categoryKorean}: ${value}`}
            onDelete={() => removeFilter(index)}
            sx={{ margin: "0.5em" }}
          />
        );
      })}
    </Box>
  );
};

export default SelectedFilters;
