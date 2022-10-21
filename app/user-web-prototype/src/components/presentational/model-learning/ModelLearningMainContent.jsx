import React from "react";

import DataInputBox from "./data-input/DataInputBox";
import DataNavigationContent from "./data-navigation/DataNavigationContent";
import FeatureSelectionContent from "./feature-selection/FeatureSelectionContent";
import SelectAlgorithmContent from "./select-algorithm/SelectAlgorithmContent";

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

  if (activeStep === 4) {
    const {
      dispatchLearnModelRequest,
      setAllLearnModelRequestFilled
    } = props;

    return (
      <SelectAlgorithmContent
        dispatchLearnModelRequest={dispatchLearnModelRequest}
        setAllLearnModelRequestFilled={setAllLearnModelRequestFilled}
      />
    )
  }

};

export default ModelLearningMainContent;
