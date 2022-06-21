import React from "react";
import UserRoleManagementContainer from "../../components/containers/user/UserRoleManagementContainer";

export default function UserRoleManagementPage(props) {
  const {mainTitle, tabNames} = props;

  return (
    <UserRoleManagementContainer
      mainTitle={mainTitle}
      tabNames={tabNames}
    />
  )
}
