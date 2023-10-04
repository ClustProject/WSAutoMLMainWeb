import React from "react";
import Box from "@mui/material/Box";
import ModelOperationResultDetailTable from "./ModelOperationResultDetailTable";

function ModelOperationResultBox(props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <ModelOperationResultDetailTable
        selectedRow={props.selectedRow}
        setSelectedRow={props.setSelectedRow}
      />
    </Box>
  );
}

export default ModelOperationResultBox;
