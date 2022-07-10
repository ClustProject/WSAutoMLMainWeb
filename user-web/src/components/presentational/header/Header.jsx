import React from 'react';

import {Box} from "@mui/material";
import MainLogoTypography from "./MainLogoTypography";
import AdminUsageListItems from "./AdminUsageListItems";

export default function Header() {
  return (
    <Box sx={{
      display: "flex"
    }}>
      <MainLogoTypography/>
      <AdminUsageListItems/>
    </Box>
  );
}
