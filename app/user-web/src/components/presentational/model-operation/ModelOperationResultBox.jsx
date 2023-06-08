import React from "react";
import Box from "@mui/material/Box";
import { CONTENT_NAME_HEIGHT } from "../model-learning/ModelLearningContent";
import ModelOperationResultDetailTable from "./ModelOperationResultDetailTable";

const DATA_INPUT_BOX_BACKGROUND_COLOR = "white";

function ModelOperationResultBox(props) {
  return (
    <Box
      sx={{
        marginBottom: CONTENT_NAME_HEIGHT,
        backgroundColor: DATA_INPUT_BOX_BACKGROUND_COLOR,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ModelOperationResultDetailTable
          selectedRow={props.selectedRow}
          setSelectedRow={props.setSelectedRow}
        />
      </div>
    </Box>
  );
}

export default ModelOperationResultBox;
