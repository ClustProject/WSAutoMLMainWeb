import React from 'react';
import Header from "../../presentational/Header";
import MainBox from "../MainBox";
import UserRoleManagementContent from "../../presentational/user/UserGrid";

export default function UserRoleManagementContainer(props) {
  const {mainTitle, tabNames} = props;

  return <>
    <Header
      mainTitle={mainTitle}
      tabNames={tabNames}
    />
    <MainBox
      content={<UserRoleManagementContent/>}
    />
  </>;
}
