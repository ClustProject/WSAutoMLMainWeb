import React, { useState, useEffect } from "react";
import { TableHead, TableRow, Paper, TableContainer } from "@mui/material";
import {
  StyledTable,
  StyledTableCell,
  StyledTableHeaderCell,
} from "../StyledTableComponents";

const ModelOperationResultDetailTable = (props) => {
  const selectedRow = props.selectedRow;
  const [target, setTarget] = useState(null);
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    if (selectedRow != null) {
      const parsedData = {
        argParamJSON: JSON.parse(selectedRow.argParam),
        varNmJSON: JSON.parse(selectedRow.varNm),
        varTgYnJSON: JSON.parse(selectedRow.varTgYn),
        ...selectedRow,
      };
      setData(parsedData);

      // 목표 변수 찾기
      for (const key in parsedData.varTgYnJSON) {
        if (parsedData.varTgYnJSON[key] === "Y") {
          setTarget(parsedData.varNmJSON[key]);
          break;
        }
      }
    }
  }, [selectedRow]);

  return (
    <TableContainer component={Paper}>
      <StyledTable
        aria-label='data table'
        stickyHeader
        sx={{ textAlign: "center" }}
      >
        <TableRow>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              학습 알고리즘
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "75%", height: "30px" }} colSpan={3}>
            {data.argNm}
          </StyledTableCell>
        </TableRow>

        <TableRow>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              목표 변수
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "30px" }}>
            {target}
          </StyledTableCell>

          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              학습 반복 횟수
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "30px" }}>
            {data.argParamJSON && data.argParamJSON.epoch
              ? data.argParamJSON.epoch
              : "epoch"}
          </StyledTableCell>
        </TableRow>

        <TableRow>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              배치사이즈
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "30px" }}>
            {data.argParamJSON && data.argParamJSON.batch_size
              ? data.argParamJSON.batch_size
              : "batch_size"}
          </StyledTableCell>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              윈도우사이즈
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "30px" }}>
            {data.argParamJSON && data.argParamJSON.window_size
              ? data.argParamJSON.window_size
              : "window_size"}
          </StyledTableCell>
        </TableRow>

        <TableRow>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              손실 함수
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "30px" }}>
            {data.argParamJSON && data.argParamJSON.loss
              ? data.argParamJSON.loss
              : "loss"}
          </StyledTableCell>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "30px" }}>
              최적화 기법
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "30px" }}>
            {data.argParamJSON && data.argParamJSON.optimizer
              ? data.argParamJSON.optimizer
              : "optimizer"}
          </StyledTableCell>
        </TableRow>

        <TableRow>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "50px" }}>
              테스트셋 비율
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "50px" }}>
            {data.argParamJSON && data.argParamJSON.test_set_rate
              ? data.argParamJSON.test_set_rate
              : "test_set_rate"}
            %
          </StyledTableCell>
          <TableHead>
            <StyledTableHeaderCell sx={{ width: "25%", height: "50px" }}>
              성능지표
              <br /> (
              {data.argParamJSON && data.argParamJSON.metrics
                ? data.argParamJSON.metrics
                : "metric"}
              )
            </StyledTableHeaderCell>
          </TableHead>
          <StyledTableCell sx={{ width: "25%", height: "50px" }}>
            {data && data.metric ? data.metric : "metric"}
          </StyledTableCell>
        </TableRow>
      </StyledTable>
    </TableContainer>
  );
};

export default ModelOperationResultDetailTable;
