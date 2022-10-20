import {styled} from "@mui/system";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";

const StyledTable = styled(Table)({
  minWidth: 650
});

const StyledTableCell = styled(TableCell)({
  padding: '10px',
});

export {
  StyledTable,
  StyledTableCell
}
