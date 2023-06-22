import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import {
  StyledTable,
  StyledTableCell,
  StyledTableHeaderCell,
} from "../StyledTableComponents";
import InfoIcon from "@mui/icons-material/Info";

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
    <TableContainer
      component={Paper}
      sx={{ minWidth: "500px", overflowX: "auto" }}
    >
      <StyledTable
        aria-label='data table'
        stickyHeader
        sx={{ textAlign: "center" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              학습 알고리즘
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "75%", height: "45px" }} colSpan={3}>
              {data.argNm}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              목표 변수
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "45px" }} colSpan={1}>
              {target}
            </StyledTableCell>

            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              학습 반복 횟수
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "45px" }} colSpan={1}>
              {data.argParamJSON && data.argParamJSON.epoch
                ? data.argParamJSON.epoch
                : "epoch"}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              배치사이즈
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "45px" }} colSpan={1}>
              {data.argParamJSON && data.argParamJSON.batch_size
                ? data.argParamJSON.batch_size
                : "batch_size"}
            </StyledTableCell>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              윈도우사이즈
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "45px" }} colSpan={1}>
              {data.argParamJSON && data.argParamJSON.window_size
                ? data.argParamJSON.window_size
                : "window_size"}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              손실 함수
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "45px" }} colSpan={1}>
              {data.argParamJSON && data.argParamJSON.loss
                ? data.argParamJSON.loss
                : "loss"}
            </StyledTableCell>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "45px" }}
              colSpan={1}
            >
              최적화 기법
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "45px" }} colSpan={1}>
              {data.argParamJSON && data.argParamJSON.optimizer
                ? data.argParamJSON.optimizer
                : "optimizer"}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "50px" }}
              colSpan={1}
            >
              테스트셋 비율
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "50px" }} colSpan={1}>
              {data.argParamJSON && data.argParamJSON.test_set_rate
                ? data.argParamJSON.test_set_rate * 100
                : "test_set_rate"}
              %
            </StyledTableCell>
            <StyledTableHeaderCell
              sx={{ width: "25%", height: "50px" }}
              colSpan={1}
            >
              성능지표{" "}
              <Tooltip
                title={
                  data.argParamJSON && data.argParamJSON.metrics
                    ? data.argParamJSON.metrics
                    : "metric"
                }
                placement='bottom'
              >
                <InfoIcon color='white' fontSize='1rem' />
              </Tooltip>
            </StyledTableHeaderCell>
            <StyledTableCell sx={{ width: "25%", height: "50px" }} colSpan={1}>
              {data && data.metric ? data.metric : "metric"}
            </StyledTableCell>
          </TableRow>
        </TableHead>
      </StyledTable>
    </TableContainer>
  );
};

export default ModelOperationResultDetailTable;
