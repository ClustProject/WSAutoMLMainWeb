import React from "react";

import { Typography } from "@mui/material";

export default function DataSetCountText(props) {
  return (
    <Typography>총 {props.countDataSet}건의 데이터를 찾았습니다.</Typography>
  );
}
