import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import { Paper, Switch } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
  StyledTable,
  StyledTableCell,
  StyledTableHeaderCell,
} from "../../StyledTableComponents";

const SWITCH_LABEL = { inputProps: { "aria-label": "Switch" } };

const FeatureSelectionContentTable = (props) => {
  const {
    setAnyTargetVariableUsed,
    json,
    payload,
    setPayload,
    setSelectedFeatures,
  } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    // json 데이터로부터 변수 이름과 중요도를 사용하여 객체를 생성합니다.
    const variables = Object.keys(json.data[0]).map((key) => ({
      variable_name: key,
      importance: json.data[0][key],
    }));

    // 생성된 객체를 기준으로 순서대로 정렬합니다.
    const sortedVariables = variables.sort(
      (a, b) => b.importance - a.importance
    );

    // 순서대로 정렬된 객체에 rate와 use 값을 추가합니다.

    const setRateAndUseData = sortedVariables.map((it, idx) => {
      if (idx <= 3) {
        return {
          ...it,
          use: true,
          rate: idx + 1,
        };
      }

      return {
        ...it,
        use: false,
        rate: idx + 1,
      };
    });

    setData(setRateAndUseData);
    updateSelectedVariables(setRateAndUseData);
  }, [props.data]); // 변경될때마다 호출됨

  function handleChangeSwitch(row, idx) {
    return () => {
      let copyOfData = JSON.parse(JSON.stringify(data));
      const use = data[idx].use;

      copyOfData[idx] = {
        ...row,
        use: !use,
      };

      setData(copyOfData);
      updateSelectedVariables(copyOfData);
    };
  }

  function updateSelectedVariables(copyOfData) {
    const newSelectedVar = copyOfData
      .filter((item) => item.use)
      .map((item) => item.variable_name);

    setPayload({
      ...payload,
      feature: newSelectedVar,
    });
    setSelectedFeatures(newSelectedVar);
    setAnyTargetVariableUsed(newSelectedVar.length > 0);
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "50%",
        height: "400px",
      }}
    >
      <StyledTable aria-label='data table' stickyHeader>
        <TableHead>
          <TableRow>
            {["사용", "순위", "변수", "중요도"].map((headerName) => (
              <StyledTableHeaderCell>{headerName}</StyledTableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={row.variable_name}>
              <StyledTableCell>
                <Switch
                  {...SWITCH_LABEL}
                  checked={row.use}
                  onChange={handleChangeSwitch(row, idx)}
                />
              </StyledTableCell>
              <StyledTableCell>{row.rate}</StyledTableCell>
              <StyledTableCell>{row.variable_name}</StyledTableCell>
              <StyledTableCell>{row.importance}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default FeatureSelectionContentTable;
