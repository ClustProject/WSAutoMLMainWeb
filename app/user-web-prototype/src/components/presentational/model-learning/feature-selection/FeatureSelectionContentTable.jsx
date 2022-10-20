import React, {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import {Paper, Switch} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {StyledTable, StyledTableCell} from "../StyledTableComponents";

const SWITCH_LABEL = {inputProps: {'aria-label': 'Switch'}};

const FeatureSelectionContentTable = (props) => {
  const {setAnyTargetVariableUsed} = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const setRateAndUseData = props.data.map((it, idx) => {
      if (idx <= 3) {
        return {
          ...it,
          use: true,
          rate: idx + 1
        }
      }

      return {
        ...it,
        use: false,
        rate: idx + 1
      }
    });

    setData(setRateAndUseData);
    handleNextButton(setRateAndUseData);
  }, [props.data]); // 변경될때마다 호출됨

  function handleChangeSwitch(row, idx) {
    return () => {
      let copyOfData = JSON.parse(JSON.stringify(data));
      const use = data[idx].use;

      copyOfData[idx] = {
        ...row,
        use: !use
      }

      setData(copyOfData);
      handleNextButton(copyOfData);
    }
  }

  function handleNextButton(copyOfData) {
    if (anySwitchOn(copyOfData)) {
      setAnyTargetVariableUsed(true);
    } else {
      setAnyTargetVariableUsed(false);
    }
  }

  function anySwitchOn(copyOfData) {
    return copyOfData.map(it => it.use)
      .includes(true)
  }

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="data table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">사용</StyledTableCell>
            <StyledTableCell align="center">순위</StyledTableCell>
            <StyledTableCell align="center">변수</StyledTableCell>
            <StyledTableCell align="center">중요도</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.variable_name}
            >
              <StyledTableCell align="center">
                <Switch {...SWITCH_LABEL}
                        checked={row.use}
                        onChange={handleChangeSwitch(row, idx)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">{row.rate}</StyledTableCell>
              <StyledTableCell align="center">{row.variable_name}</StyledTableCell>
              <StyledTableCell align="center">{row.importance}</StyledTableCell>

            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );

}

export default FeatureSelectionContentTable;
