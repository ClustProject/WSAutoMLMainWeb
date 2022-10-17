import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Checkbox, Paper, Switch} from "@mui/material";
import {styled} from '@mui/system';
import TableBody from "@mui/material/TableBody";

const AVERAGE_SPEED = "평균속도";

const SWITCH_LABEL = {inputProps: {'aria-label': 'Switch'}};
const CHECKBOX_LABEL = {inputProps: {'aria-label': 'CheckBox'}};

const StyledTable = styled(Table)({
  minWidth: 650
})

const StyledTableCell = styled(TableCell)({
  padding: '10px',
})

export default function DataNavigationContentTable(props) {
  const {data} = props;

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">변수명</StyledTableCell>
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
          {data.map((row) => (
            <TableRow
              key={row.variable_name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0
                }
              }}
            >
              <StyledTableCell align="left">{row.variable_name}</StyledTableCell>
              <StyledTableCell align="left">{row.variable_type}</StyledTableCell>
              <StyledTableCell align="right">{row.min}</StyledTableCell>
              <StyledTableCell align="right">{row.max}</StyledTableCell>
              <StyledTableCell align="right">{row.missing_value}</StyledTableCell>
              <StyledTableCell align="right">{row.average}</StyledTableCell>
              <StyledTableCell align="right">{row.standard_deviation}</StyledTableCell>
              <StyledTableCell>
                <Switch {...SWITCH_LABEL} defaultChecked/>
              </StyledTableCell>
              {
                row.variable_name === AVERAGE_SPEED ?
                  <StyledTableCell>
                    <Checkbox {...CHECKBOX_LABEL} defaultChecked/>
                  </StyledTableCell>
                  :
                  <StyledTableCell>
                    <Checkbox {...CHECKBOX_LABEL} />
                  </StyledTableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
