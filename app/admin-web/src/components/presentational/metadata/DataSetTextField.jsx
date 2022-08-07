import React from "react";

import {TextField} from "@mui/material";

export default function DataSetTextField(props) {
  const {eng, kor} = props.name;
  const {value} = props;

  return <TextField
    id={eng}
    label={kor}
    variant="filled"
    fullWidth
    name={eng} // note: reducer에서 해당 값을 쓰고있음
    value={value}
    onChange={props.onChange}
  />;
}
