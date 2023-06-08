import React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CONTENT_NAME_HEIGHT } from "../ModelLearningContent";
import DataInputGrid from "./DataInputGrid";

const DATA_INPUT_BOX_BACKGROUND_COLOR = "white";

function DataInputBox(props) {
  return (
    <Box
      sx={{
        width: "90%",
      }}
    >
      <Typography
        variant='subtitle1'
        align='right'
        sx={{
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        메타데이터 리스트
      </Typography>
      <Box
        sx={{
          marginBottom: CONTENT_NAME_HEIGHT,
          backgroundColor: DATA_INPUT_BOX_BACKGROUND_COLOR,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DataInputGrid
            selectedRow={props.selectedRow}
            setSelectedRow={props.setSelectedRow}
            downloadUrl={props.downloadUrl}
            setDownloadUrl={props.setDownloadUrl}
          />
        </div>
      </Box>
    </Box>
  );
}

export default DataInputBox;
