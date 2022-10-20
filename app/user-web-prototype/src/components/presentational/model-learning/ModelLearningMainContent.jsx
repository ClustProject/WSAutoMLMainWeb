import React from "react";

import DataInputBox from "./DataInputBox";
import DataNavigationContent from "./DataNavigationContent";
import FeatureSelectionContent from "./FeatureSelectionContent";

const ModelLearningMainContent = (props) => {
  const {activeStep} = props;

  if (activeStep === 1) {
    const {fileChanged, setFileChanged} = props;

    return (
      <DataInputBox
        fileChanged={fileChanged}
        setFileChanged={setFileChanged}
      />
    )
  }

  if (activeStep === 2) {
    const {setAnyTargetVariableChecked} = props;

    return (
      <DataNavigationContent
        setAnyTargetVariableChecked={setAnyTargetVariableChecked}
      />
    );
  }

  if (activeStep === 3) {
    const {setAnyTargetVariableUsed} = props;

    return (
      <FeatureSelectionContent
        setAnyTargetVariableUsed={setAnyTargetVariableUsed}
      />
    )
  }

};

export default ModelLearningMainContent;
