import React from "react";

import {Box, Link} from "@mui/material";

const contactInfo = {
  "title": "데이터 활용 및 플랫폼 사용 문의",
  "email": "tdchoi@wise.co.kr"
}

export default function ContactTextBox() {
  return (
    <Box sx={{
      margin: '25px'
    }}>
      {contactInfo.title}
      <br/>
      <Link
        href={`
          mailto: ${contactInfo.email}
          ?subject=${contactInfo.title}
        `}
        target="_blank"
        sx={{
          margin: '5px'
        }}
      >
        {contactInfo.email}
      </Link>
    </Box>
  );
}

