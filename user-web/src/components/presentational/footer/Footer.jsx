import React from "react";

import {Box, Divider} from "@mui/material";
import LinkBoxes from "./LinkBoxes";
import ContactTextBox from "./ContactTextBox";
import LicenseTextBox from "./LicenseTextBox";

export default function Footer() {
  return (
    <Box sx={{
      marginTop: '50px',
      color: 'white',
      backgroundColor: '#2a3eb1',
      height: '425px',
    }}>
      <LinkBoxes/>
      <Divider/>
      <Box sx={{
        textAlign: 'center',
      }}>
        <ContactTextBox/>
        <LicenseTextBox/>
      </Box>
    </Box>
  );
}
