import React, { useState } from "react";
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
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import TimeSeriesProcesserImage1 from "./TimeSeriesProcesser1.png";
import TimeSeriesProcesserImage2 from "./TimeSeriesProcesser2.png";
import ModelDataInterpolation from "./ModelDataInterpolation";

const ImageSwiper = () => {
  return (
    <AliceCarousel
      dotsDisabled={false}
      disableDotsControls={true}
      disableSlideInfo={false}
    >
      <div>
        <Chip label={"Row Graph"} />
        <img src={TimeSeriesProcesserImage1} alt='Time Series Processor 1' />
      </div>
      <div>
        <Chip label={"Predict Graph"} />
        <img src={TimeSeriesProcesserImage2} alt='Time Series Processor 2' />
      </div>
    </AliceCarousel>
  );
};

const ModelTimeSeriesProcesser = (props) => {
  const { open, onClose, selectedRowData } = props;
  const [openDataInterpolation, setOpenDataInterpolation] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='xl'>
        <DialogTitle>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
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
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
          >
            <Box
              display='flex'
              flexDirection='column'
              gap={1}
              pr={2}
              sx={{ width: "30%" }}
            >
              {selectedRowData ? (
                <Chip label={`모델명: ${selectedRowData.modelNm}`} />
              ) : null}
              <ModelPreviewBox
                selectedRowData={selectedRowData ? selectedRowData : null}
              />
              <UploadFile />
              <Button
                variant='outlined'
                onClick={() => setOpenDataInterpolation(true)}
              >
                데이터 보간
              </Button>
              <Button variant='outlined'>모델 적용</Button>
            </Box>
            <Divider orientation='vertical' flexItem />
            <Box
              display='flex'
              flexDirection='column'
              gap={1}
              pl={2}
              sx={{ width: "65%" }}
            >
              <ImageSwiper />
              <Button variant='outlined'>다운로드</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <ModelDataInterpolation
        open={openDataInterpolation}
        onClose={() => setOpenDataInterpolation(false)}
      />
    </>
  );
};

export default ModelTimeSeriesProcesser;
