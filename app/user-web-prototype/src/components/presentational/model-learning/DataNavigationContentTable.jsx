import * as React from 'react';
import {useEffect, useState} from 'react';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Checkbox, Paper, Switch} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {StyledTable, StyledTableCell} from "./StyledTableComponents";

const AVERAGE_SPEED = "평균속도";

const SWITCH_LABEL = {inputProps: {'aria-label': 'Switch'}};
const CHECKBOX_LABEL = {inputProps: {'aria-label': 'CheckBox'}};

export default function DataNavigationContentTable(props) {
  const {setAnyTargetVariableChecked} = props;

  const [data, setData] = useState([]);

  useEffect(() => {
      const setUseAndTargetVariableData = props.data.map(it => {
        if (it.variable_name === AVERAGE_SPEED) {
          setAnyTargetVariableChecked(true);

          return {
            ...it,
            use: true,
            target_variable: true
          }
        }

        return {
          ...it,
          use: true,
          target_variable: false
        }
      });

      setData(setUseAndTargetVariableData);
    }, [props.data] // 변경될때마다 호출됨
  );

  function handleChangeSwitch(row, idx) {
    return () => {
      let copyOfData = JSON.parse(JSON.stringify(data));
      const use = data[idx].use;

      copyOfData[idx] = {
        ...row,
        use: !use,
        target_variable: false
      }

      setData(copyOfData);
      handleNextButton(copyOfData);
    };
  }

  function handleChangeCheckbox(row, idx) {
    return () => {
      let copyOfData = JSON.parse(JSON.stringify(data));
      const targetVariable = data[idx].target_variable;

      copyOfData[idx] = {
        ...row,
        target_variable: !targetVariable,
      }

      setData(copyOfData);
      handleNextButton(copyOfData);
    };
  }

  function handleNextButton(copyOfData) {
    if (anyTargetVariableChecked(copyOfData)) {
      setAnyTargetVariableChecked(true);
    } else {
      setAnyTargetVariableChecked(false);
    }
  }

  function anyTargetVariableChecked(copyOfData) {
    const targetVariableCheckRows = copyOfData.filter(it => it.target_variable === true);

    return targetVariableCheckRows.length > 0;
  }

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="data table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">변수명</StyledTableCell>
            <StyledTableCell align="center">변수유형</StyledTableCell>
            <StyledTableCell align="right">최솟값</StyledTableCell>
            <StyledTableCell align="right">최대값</StyledTableCell>
            <StyledTableCell align="right">결측값</StyledTableCell>
            <StyledTableCell align="right">평균</StyledTableCell>
            <StyledTableCell align="right">표준편차</StyledTableCell>
            <StyledTableCell align="center">사용</StyledTableCell>
            <StyledTableCell align="center">목표변수</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.variable_name}
            >
              <StyledTableCell align="left">{row.variable_name}</StyledTableCell>
              <StyledTableCell align="left">{row.variable_type}</StyledTableCell>
              <StyledTableCell align="right">{row.min}</StyledTableCell>
              <StyledTableCell align="right">{row.max}</StyledTableCell>
              <StyledTableCell align="right">{row.missing_value}</StyledTableCell>
              <StyledTableCell align="right">{row.average}</StyledTableCell>
              <StyledTableCell align="right">{row.standard_deviation}</StyledTableCell>
              <StyledTableCell>
                <Switch {...SWITCH_LABEL}
                        checked={row.use}
                        onChange={handleChangeSwitch(row, idx)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox {...CHECKBOX_LABEL}
                          disabled={!row.use}
                          checked={row.target_variable}
                          onChange={handleChangeCheckbox(row, idx)}
                />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );

}
