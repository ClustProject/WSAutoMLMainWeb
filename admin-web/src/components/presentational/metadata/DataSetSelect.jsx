import React from "react";

import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export default function DataSetSelect(props) {
  const {eng, kor} = props.name;

  const labelName = `${eng}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelName}>{kor}</InputLabel>
      <Select
        labelId={labelName}
        id={eng}
        label={kor}
        name={eng} // note: reducer에서 해당 값을 쓰고있음
        fullWidth
        onChange={props.onChange}
      >
        {props.list.map(it => (
          <MenuItem value={it}>{it} </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

