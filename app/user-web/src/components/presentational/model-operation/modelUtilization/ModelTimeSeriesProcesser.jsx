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
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import TimeSeriesProcesserImage1 from "./TimeSeriesProcesser1.png";
import TimeSeriesProcesserImage2 from "./TimeSeriesProcesser2.png";
import ModelDataInterpolationBox from "./ModelDataInterpolationBox";
import ModelDataPredictionBox from "./ModelDataPredictionBox";
import LinearProgress from "@mui/material/LinearProgress";
import UploadFile from "./UploadFile";

const ImageSwiper = () => {
  return (
    <AliceCarousel
      dotsDisabled={false}
      disableDotsControls={true}
      disableSlideInfo={false}
    >
      <Box
        sx={{
          marginRight: "5px",
          marginLeft: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Chip
          label={"Row Graph"}
          sx={{ marginBottom: "30px", width: "100%" }}
        />
        <img
          src={TimeSeriesProcesserImage1}
          alt='Time Series Processor 1'
          style={{
            height: "300px",
            width: "99%",
            border: "1px solid gainsboro",
          }}
        />
      </Box>
      <Box
        sx={{
          marginRight: "5px",
          marginLeft: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Chip
          label={"Predict Graph"}
          sx={{ marginBottom: "30px", width: "100%" }}
        />
        <img
          src={TimeSeriesProcesserImage2}
          alt='Time Series Processor 2'
          style={{
            height: "300px",
            width: "99%",
            border: "1px solid gainsboro",
          }}
        />
      </Box>
    </AliceCarousel>
  );
};

const ModelTimeSeriesProcesser = (props) => {
  const { open, onClose, selectedRowData } = props;
  const [openDataInterpolation, setOpenDataInterpolation] = useState(false);
  const [openDataPrediction, setOpenDataPrediction] = useState(false);
  const [predictionProgress, setPredictionProgress] = useState(0); // 예측 진행률 상태 추가
  const [useImputedData, setUseImputedData] = useState(false);

  const startPrediction = () => {
    setPredictionProgress(0);
    const interval = setInterval(() => {
      setPredictionProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prevProgress + 10, 100);
      });
    }, 500);
  };

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
              pr={2}
              sx={{ width: "30%" }}
            >
              {selectedRowData ? (
                <Chip
                  label={`모델명: ${selectedRowData.modelNm}`}
                  sx={{ marginBottom: "30px" }}
                />
              ) : null}

              <ModelPreviewBox
                selectedRowData={selectedRowData ? selectedRowData : null}
              />
              <UploadFile />
              <Box variant='outlined'>
                <Button
                  variant='outlined'
                  startIcon={<CloudSyncIcon />}
                  onClick={() => setOpenDataInterpolation(true)}
                >
                  데이터 보간
                </Button>
              </Box>
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
              <Box
                display='flex'
                flexDirection='row'
                gap={2}
                pl={2}
                alignItems='center'
              >
                <Button
                  variant='outlined'
                  onClick={() => {
                    startPrediction();
                    setUseImputedData(false);
                  }}
                >
                  기존데이터로 예측 시작
                </Button>

                <Button
                  variant='outlined'
                  onClick={() => {
                    setOpenDataPrediction(true);
                    setUseImputedData(false);
                  }}
                >
                  기존데이터 예측 결과
                </Button>
                {predictionProgress > 0 && predictionProgress < 100 ? (
                  <LinearProgress
                    variant='determinate'
                    value={predictionProgress}
                    sx={{ flexGrow: 1 }}
                  />
                ) : null}
              </Box>
              <Box
                display='flex'
                flexDirection='row'
                gap={2}
                pl={2}
                alignItems='center'
              >
                <Button
                  variant='outlined'
                  onClick={() => {
                    startPrediction();
                    setUseImputedData(true);
                  }}
                >
                  보간데이터로 예측 시작
                </Button>

                <Button
                  variant='outlined'
                  onClick={() => {
                    setOpenDataPrediction(true);
                    setUseImputedData(true);
                  }}
                >
                  보간데이터 예측 결과
                </Button>
                {predictionProgress > 0 && predictionProgress < 100 ? (
                  <LinearProgress
                    variant='determinate'
                    value={predictionProgress}
                    sx={{ flexGrow: 1 }}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <ModelDataInterpolationBox
        open={openDataInterpolation}
        onClose={() => setOpenDataInterpolation(false)}
      />
      <ModelDataPredictionBox
        open={openDataPrediction}
        onClose={() => setOpenDataPrediction(false)}
        useImputedData={useImputedData}
      />
    </>
  );
};

export default ModelTimeSeriesProcesser;
