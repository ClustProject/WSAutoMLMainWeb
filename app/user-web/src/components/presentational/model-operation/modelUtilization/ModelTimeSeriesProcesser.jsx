import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import ModelPreviewBox from "./ModelPreviewBox";
import "react-alice-carousel/lib/alice-carousel.css";
import ModelDataPredictionBox from "./ModelDataPredictionBox";
import UploadFile from "./UploadFile";
import InfoIcon from "@mui/icons-material/Info";

const SpaceBetweenFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBlock: "10px",
});

const ModelTimeSeriesProcesser = (props) => {
  const { open, onClose, selectedRowData } = props;
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [selectData, setSelectData] = useState("");
  const [payload, setPayload] = useState([]);
  // const [predictData, setPredictData] = useState("");

  console.log(payload);

  useEffect(() => {
    if (
      selectedRowData &&
      selectedRowData.varUseYnJSON &&
      selectedRowData.varNmJSON &&
      selectedRowData.varTgYnJSON
    ) {
      const feature = [];
      let target = "";

      Object.keys(selectedRowData.varUseYnJSON).forEach((index) => {
        if (selectedRowData.varUseYnJSON[index] === "Y") {
          feature.push(selectedRowData.varNmJSON[index]);
        }
        if (selectedRowData.varTgYnJSON[index] === "Y") {
          target = selectedRowData.varNmJSON[index];
        }
      });

      // URL에서 파일 이름 추출
      const modelUrl = selectedRowData.modelUrl;
      const modelFileName = modelUrl.split("/").pop();

      // selectedRowData에 feature와 target 추가
      setPayload({
        // data_url: uploadedFileUrl,
        // road_url:
        //   "https://automl-file-storage-test.s3.ap-northeast-2.amazonaws.com/road_data.csv",
        // model_name: "data10_LSTM_144_288_30.h5",
        // feature: ["집계시분", "콘존ID", "차로유형구분코드"],
        // target: "평균속도",
        // window_size: 144,
        data_url: uploadedFileUrl,
        road_url:
          "https://automl-file-storage-test.s3.ap-northeast-2.amazonaws.com/road_data.csv",
        model_name: modelFileName,
        feature,
        target,
        window_size: selectedRowData.argParamJSON.window_size,
      });
    }
  }, [selectedRowData, uploadedFileUrl]);

  const handleChange = (event) => {
    setSelectData(event.target.value);
  };

  const [isLoading, setIsLoading] = useState(false); // 버튼의 로딩 상태를 위한 state 추가
  // const [predictionResultButtonDisabled, setPredictionResultButtonDisabled] =
  useState(true); // 예측 결과 버튼 활성화 상태를 위한 state 추가

  const startPrediction = () => {
    setIsLoading(true); // 로딩 시작
    console.log("Sending data:", payload);
    fetch("http://52.79.123.200:8797/v1/data_predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        // setPredictData(data);
      })
      .catch((error) => console.error("Error occurred:", error));

    setTimeout(() => {
      setIsLoading(false); // 5초 후 로딩 상태 종료
      // setPredictionResultButtonDisabled(false); // 예측 결과 버튼 활성화
    }, 5000);
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
            {selectedRowData ? (
              <Typography variant='h4'>
                모델명{" "}
                <Chip
                  label={selectedRowData.modelNm}
                  sx={{
                    height: "40px",
                    verticalAlign: "unset",
                    fontSize: "2.125rem",
                    backgroundColor: "#9fa8da",
                    color: "#fff",
                  }}
                />
              </Typography>
            ) : null}

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
              <Chip
                label={
                  <Box display='flex' alignItems='center' gap='5px'>
                    모델 활용에 필요한 업로드 파일 형식
                    <Tooltip
                      title='업로드 파일의 컬럼 및 데이터 예시를 나타냅니다. 파란색으로 표시된 컬럼은 목표변수를 의미합니다.'
                      placement='bottom'
                    >
                      <InfoIcon color='primary' />
                    </Tooltip>
                  </Box>
                }
                sx={{
                  fontSize: "15px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />

              <ModelPreviewBox
                selectedRowData={selectedRowData ? selectedRowData : null}
              />
              <UploadFile setUploadedFileUrl={setUploadedFileUrl} />
              <SpaceBetweenFlexBox>
                <FormControl variant='standard' sx={{ m: 1, width: "300px" }}>
                  <InputLabel id='demo-simple-select-label'>
                    수행 작업 선택
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectData}
                    label='Data'
                    onChange={handleChange}
                  >
                    <MenuItem value={"data_interpolation"}>
                      데이터 보간
                    </MenuItem>
                    <MenuItem value={"data_prediction"}>데이터 예측</MenuItem>
                  </Select>
                </FormControl>
                <LoadingButton
                  loading={isLoading} // 로딩 상태에 따라 버튼의 로딩 표시 조절
                  variant='outlined'
                  loadingPosition='end'
                  onClick={() => {
                    startPrediction();
                  }}
                  sx={{ width: "150px" }}
                >
                  {isLoading ? "작업 진행 중" : "작업 시작"}
                </LoadingButton>
              </SpaceBetweenFlexBox>
            </Box>
            <Divider orientation='vertical' flexItem />
            <Box
              display='flex'
              flexDirection='column'
              gap={1}
              pl={2}
              sx={{ width: "65%" }}
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
                  label={"구간별 결측치 보간"}
                  sx={{
                    fontSize: "15px",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                />
                <Box
                  sx={{
                    height: "460px",
                    width: "99%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid gainsboro",
                  }}
                >
                  <ModelDataPredictionBox />
                </Box>
              </Box>

              <Box
                display='flex'
                flexDirection='row'
                gap={2}
                pl={2}
                alignItems='center'
                justifyContent='flex-end'
              ></Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModelTimeSeriesProcesser;
