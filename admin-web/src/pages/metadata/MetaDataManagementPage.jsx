import React from "react";
import MetaDataManagementContainer from "../../components/containers/metadata/MetaDataManagementContainer";

export default function MetaDataManagementPage(props) {
  const {mainTitle, tabNames} = props;

  return (
    <MetaDataManagementContainer
      mainTitle={mainTitle}
      tabNames={tabNames}
    />
  )
}
