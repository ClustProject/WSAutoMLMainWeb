import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModelPreviewBox from "./ModelPreviewBox";
import UploadFile from "./UploadFile";
import TimeSeriesProcesserImage from "./TimeSeriesProcesser.png";

const ModelTimeSeriesProcesser = (props) => {
  const { open, onClose, selectedRowData } = props;

  console.log(selectedRowData);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xl'>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4'>Time Series Processer</Typography>
          <IconButton
            edge='end'
            color='inherit'
            onClick={onClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Box display='flex' flexDirection='column' gap={1} pr={2}>
            {selectedRowData ? (
              <Chip label={`모델명: ${selectedRowData.modelNm}`} />
            ) : null}
            <ModelPreviewBox
              selectedRowData={selectedRowData ? selectedRowData : null}
            />
            <UploadFile />
            <Button variant='outlined'>데이터 보간</Button>
            <Button variant='outlined'>모델 적용</Button>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box display='flex' flexDirection='column' gap={1} pl={2}>
            <img
              src={TimeSeriesProcesserImage}
              alt='Time Series Processor'
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            <Button variant='outlined'>다운로드</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModelTimeSeriesProcesser;
