import React, {useEffect, useState} from "react";

import {Box, Card, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from "@mui/material";

import {getModelLearningResult} from "../../../../api/api.js";
import {CONTENT_BACKGROUND_COLOR} from "../ModelLearningContent";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const ModelLearningResultContent = () => {
  const [data, setData] = useState({
    imageUrl: "",
    model_learning_info: {},
  });

  useEffect(() => {
    getModelLearningResult().then((it) => {
      setData(it);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: 800,
        marginTop: 3,
        padding: 5
      }}
    >
      <Box>
        <Typography variant="h6">실제-예측 결과 비교</Typography>
        <Card>
          <CardMedia
            component="img"
            image={data.image_url}
            alt="model learning result image"
          />
        </Card>
      </Box>

      <Box sx={{
        my: '25px'
      }}/>

      <Box>
        <Typography variant="h6">학습 결과</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{
                  backgroundColor: CONTENT_BACKGROUND_COLOR
                }}>
                  모델 학습 실행 결과
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: CONTENT_BACKGROUND_COLOR
                }}>
                  데이터셋 정보
                </TableCell>
                <TableCell colSpan={6}>
                  파일명: {data.data_set} <br/>
                  목표 변수: {data.target_variable} <br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: CONTENT_BACKGROUND_COLOR
                }} rowSpan={2}>
                          모델 학습 방법
                </TableCell>
                <TableCell colSpan={6}>
                  모델명: {data.model_learning_info.name} <br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  batch_size: {data.model_learning_info.batch_size} <br/>
                  window_size: {data.model_learning_info.window_size} <br/>
                  epoch: {data.model_learning_info.epoch} <br/>
                  검증비율: {data.test_set}
                </TableCell>
                <TableCell colSpan={3}>
                  손실 함수: {data.model_learning_info.loss} <br/>
                  최적화 함수: {data.model_learning_info.optimizer} <br/>
                  성능지표: {data.model_learning_info.metrics} <br/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ModelLearningResultContent;
