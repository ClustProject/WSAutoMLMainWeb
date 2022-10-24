import React from "react";

import Box from "@mui/material/Box";
import {IconButton, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import {CONTENT_NAME_HEIGHT} from "../ModelLearningContent";

const DATA_INPUT_BOX_BACKGROUND_COLOR = 'white';

function DataInputBox(props) {
  return (
    <>
      <Box sx={{
        marginBottom: CONTENT_NAME_HEIGHT,
        backgroundColor: DATA_INPUT_BOX_BACKGROUND_COLOR,
        width: '500px',
      }}>
        <Box sx={{
          margin: '10px',
          padding: '10px',
          height: '20px'
        }}>
          <Typography variant="h5">
            업로드 방법
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '280px',
          marginBottom: '20px'
        }}>
          <Box >
            <Box sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <CloudUploadIcon color='info' style={{fontSize: 75}}/>
            </Box>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {props.fileChanged ?
                <IconButton color='info' component="label" size='large'>
                  <DoneIcon/>
                </IconButton> :
                <IconButton color='info' component="label" size='large'>
                  <SaveIcon/>
                </IconButton>
              }
              <Button variant="contained" component="label" size="small">
                로컬 파일 업로드
                <input hidden accept=".csv" type="file" onChange={() => {
                  props.setFileChanged(true);
                }}/>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DataInputBox;
