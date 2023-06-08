import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";

const StyledTable = styled(Table)({
  minWidth: 420,
});

const StyledTableCell = styled(TableCell)({
  padding: "10px",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const StyledTableHeaderCell = styled(TableCell)({
  padding: "10px",
  backgroundColor: "#7986cb",
  color: "white",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export { StyledTable, StyledTableCell, StyledTableHeaderCell };
