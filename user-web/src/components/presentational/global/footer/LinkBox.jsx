import React from "react";

import {Box, Link} from "@mui/material";

export default function LinkBox(props) {
  return (
    <Box sx={{
      margin: "50px"
    }}>
      <Box>
        {props.title}
      </Box>
      <Box sx={{
        margin: '15px'
      }}/>
      <Box>
        {props.links.map(link => (
          <Box sx={{
            marginTop: '5px'
          }}>
            <Link href={link.href || "#"} underline="hover">
              {link.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
