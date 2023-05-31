import React, { useState } from "react";

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { CONTENT_NAME_HEIGHT } from "../ModelLearningContent";
import DataInputGrid from "./DataInputGrid";

const DATA_INPUT_BOX_BACKGROUND_COLOR = "white";

function DataInputBox(props) {
  // api 실행 결과
  const [result, setResult] = useState(null);

  // python api 호출하는 함수
  function handleClick() {
    // 1. 메타데이터 선택
    // const data = {
    //   url: props.downloadUrl,
    // };
    // console.log("Sending data:", data);

    // fetch("http://52.79.123.200:8797/v1/data_info", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Received data:", data);
    //     setResult(data);
    //   })
    //   .catch((error) => console.error("Error occurred:", error));

    // 2. 데이터 탐색
    // const data = {
    //   url: props.downloadUrl,
    //   selected_var: [
    //     "교통량",
    //     "콘존길이",
    //     "제한속도",
    //     "버스전용차로유무",
    //     "집계날",
    //     "노선구성순번",
    //     "차로수",
    //     "콘존ID",
    //   ],
    //   target: "평균속도",
    // };
    // console.log("Sending data:", data);

    // fetch("http://52.79.123.200:8797/v1/feature_importance", {
    //   method: "POST",import Chart from './Chart';

    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Received data:", data);
    //     setResult(data);
    //   })
    //   .catch((error) => console.error("Error occurred:", error));

    // 3. 히트맵
    // const data = {
    //   url: props.downloadUrl,
    // };

    // console.log("Sending data:", data);

    // fetch("http://52.79.123.200:8797/v1/heatmap", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Received data:", data);
    //   })
    //   .catch((error) => console.error("Error occurred:", error));

    // 4. 알고리즘 선택 및 모델명 설정
    const data = {
      url:
        "https://automl-file-storage.s3.ap-northeast-2.amazonaws.com/20221028-071308-converted_df_2.csv",
      feature: [
        "교통량",
        "콘존길이",
        "제한속도",
        "버스전용차로유무",
        "집계날",
        "노선구성순번",
        "차로수",
        "콘존ID",
      ],
      target: "평균속도",
      params: [
        100,
        2,
        1,
        "mean_squared_error",
        "adam",
        "mean_squared_error",
        0.2,
      ],
      model: "LSTM",
      result_id: 18,
    };

    console.log("Sending data:", data);

    fetch("http://52.79.123.200:8797/v1/ml", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
      })
      .catch((error) => console.error("Error occurred:", error));
  }

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
      {/* <Button onClick={handleClick}>API 호출</Button>
      {result && (
        <div>
          <p>total_row: {result.total_row}</p>
          <p>total_null: {result.total_null}</p>
          <p>data: {JSON.stringify(result.data)}</p>
        </div>
      )} */}
    </Box>
  );
}

export default DataInputBox;
