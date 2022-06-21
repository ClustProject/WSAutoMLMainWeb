import React from 'react';
import Header from "../../presentational/Header";
import MainBox from "../MainBox";
import ToDoContent from "../../presentational/dashboard/ToDoContent";

export default function MetaDataManagementContainer(props) {
  const {mainTitle, tabNames} = props;

  return <>
    <Header
      mainTitle={mainTitle}
      tabNames={tabNames}
    />
    <MainBox
      content={<ToDoContent/>}
    />
  </>;
}
