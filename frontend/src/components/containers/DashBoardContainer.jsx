import React from 'react'
import Header from "../presentational/Header";
import ToDoContent from "../presentational/dashboard/ToDoContent";
import MainBox from "./MainBox";

export default function DashBoardContainer() {
  const mainTitle = "대시보드";

  return <>
    <Header
      mainTitle={mainTitle}
    />
    <MainBox
      content={<ToDoContent/>}
    />
  </>
}
