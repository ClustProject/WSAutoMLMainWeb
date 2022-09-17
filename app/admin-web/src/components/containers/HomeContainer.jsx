import React from 'react'
import Header from "../presentational/Header";
import MainBox from "./MainBox";
import Paper from "@mui/material/Paper";
import {Alert} from "@mui/material";

function AdminPageAlert() {
  return (
    <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
      <Alert severity="info">관리자를 위한 페이지입니다.</Alert>
    </Paper>
  )
}

export default function HomeContainer() {
  return <>
    <Header/>
    <MainBox
      content={<AdminPageAlert/>}
    />
  </>
}
