import React from "react";

import {Typography} from "@mui/material";

const dataSetCount = 3;

export default function DataSetCountText() {
  return (
    <Typography>
      {dataSetCount}건의 데이터를 찾았습니다.
    </Typography>
  );
}
