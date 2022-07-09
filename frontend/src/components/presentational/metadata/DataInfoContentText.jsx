import React from "react";

import {DialogContentText} from "@mui/material";

export default function DataInfoContentText(props) {
  return (
    <DialogContentText sx={{
      margin: "10px",

    }}>
      {props.name} 정보
    </DialogContentText>
  );
}
