import * as React from 'react';
import Paper from '@mui/material/Paper';
import {Alert} from "@mui/material";

/**
 * 개발 예정중인 컨텐츠임을 알리기 위해 사용합니다.
 */
export default function ToDoContent() {
  return (
    <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
      <Alert severity="info">개발 예정</Alert>
    </Paper>
  );
}
