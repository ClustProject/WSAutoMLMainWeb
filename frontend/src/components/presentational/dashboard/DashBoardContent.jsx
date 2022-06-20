import * as React from 'react';
import Paper from '@mui/material/Paper';
import {Alert} from "@mui/material";

export default function DashBoardContent() {
  return (
    <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
      <Alert severity="info">개발 예정</Alert>
    </Paper>
  );
}
