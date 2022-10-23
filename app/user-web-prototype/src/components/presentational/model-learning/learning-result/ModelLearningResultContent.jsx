import React, {useEffect, useState} from "react";

import {Box, Card, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from "@mui/material";

import {getModelLearningResult} from "../../../../api/api.js";
import {CONTENT_BACKGROUND_COLOR} from "../ModelLearningContent";

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
        width: 850,
        height: 500,
        marginTop: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6">실제-예측 결과 비교</Typography>
        <Card sx={{
          width: 500
        }}>
          <CardMedia
            component="img"
            image={data.image_url}
            alt="model learning result image"
          />
        </Card>
      </Box>
      <Box>
        <Typography variant="h6">학습 결과</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center" sx={{
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
                데이터셋
              </TableCell>
              <TableCell>{data.data_set}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{
                backgroundColor: CONTENT_BACKGROUND_COLOR
              }}>
                모델 학습 방법
              </TableCell>
              <TableCell>
                name: {data.model_learning_info.name} <br/> <br/>
                batch_size: {data.model_learning_info.batch_size} <br/>
                window_size: {data.model_learning_info.window_size} <br/>
                epoch: {data.model_learning_info.epoch} <br/>
                loss: {data.model_learning_info.loss} <br/>
                optimizer: {data.model_learning_info.optimizer} <br/>
                metrics: {data.model_learning_info.metrics} <br/>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{
                backgroundColor: CONTENT_BACKGROUND_COLOR
              }}>
                목표 변수
              </TableCell>
              <TableCell>{data.target_variable}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{
                backgroundColor: CONTENT_BACKGROUND_COLOR
              }}>성능 지표</TableCell>
              <TableCell>{data.performance_indicators}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default ModelLearningResultContent;
