import React from 'react';

import {Box} from "@mui/material";
import MainLogo from "./MainLogo";
import AdminUsageListItems from "./AdminUsageListItems";

export default function Header() {
  return (
    <Box sx={{
      display: "flex"
    }}>
      <MainLogo/>
      <AdminUsageListItems/>
    </Box>
  );
}
