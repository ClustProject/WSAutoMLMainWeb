import React from "react";

import {Divider} from "@mui/material";
import DataTreeMap from "./DataTreeMap";
import ContentMediaCards from "./ContentMediaCards";

export default function Content() {
  return (
    <>
      <DataTreeMap/>

      <Divider sx={{
        margin: '25px'
      }}/>

      <ContentMediaCards/>
    </>
  )
}

