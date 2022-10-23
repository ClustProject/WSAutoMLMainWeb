import React, { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Divider, StepLabel, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ModelLearningMainContent from "./ModelLearningMainContent";
import { styled } from "@mui/system";
import LearnModelRequestReducer, {
  INIT_LEARN_MODEL_REQUEST,
} from "./select-algorithm/reducers/LearnModelRequestReducer";

export const CONTENT_NAME_HEIGHT = "50px";

const CONTENT_BACKGROUND_COLOR = "#F4F8F9";

const STEP_COUNT_AND_NAME_MAP = {
  1: "데이터 입력",
  2: "데이터 탐색",
  3: "특징 선택",
  4: "알고리즘 선택",
  5: "모델 학습 결과",
};
const STEPS = Object.keys(STEP_COUNT_AND_NAME_MAP);
const MIN_STEP = Math.min(...STEPS);
const MAX_STEP = Math.max(...STEPS);

const ModelLearningMainContentWrappingBox = styled(Box)({
  backgroundColor: CONTENT_BACKGROUND_COLOR,
  minHeight: "450px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StepButtonsWrappingBox = styled(Box)({
  backgroundColor: CONTENT_BACKGROUND_COLOR,
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "110px",
});

const PreviousStepButton = (props) => {
  const { onClick, disabled } = props;

  return (
    <Button variant="outlined" disabled={disabled} onClick={onClick}>
      이전
    </Button>
  );
};

const NextStepButton = (props) => {
  const { onClick, disabled } = props;

  return (
    <Button
      variant="contained"
      sx={{
        marginLeft: "15px",
      }}
      disabled={disabled}
      onClick={onClick}
    >
      다음
    </Button>
  );
};

const StepperBox = (props) => {
  return (
    <Box
      sx={{
        marginTop: "30px",
      }}
    >
      <Stepper
        activeStep={props.activeStep - 1} // 0부터 시작
        // nonLinear
        alternativeLabel
      >
        {Object.values(STEP_COUNT_AND_NAME_MAP).map((it) => (
          <Step
            key={it}
            sx={{
              marginTop: "12px",
            }}
          >
            <StepLabel>{it}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const StepNameBox = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: CONTENT_BACKGROUND_COLOR,
        height: CONTENT_NAME_HEIGHT,
      }}
    >
      <Box
        sx={{
          marginTop: "50px",
          padding: "15px",
        }}
      >
        <Typography variant="h4">
          {STEP_COUNT_AND_NAME_MAP[props.activeStep]}
        </Typography>
      </Box>
    </Box>
  );
};

const ModelLearningTypography = () => {
  return <Typography variant="h5">모델 학습</Typography>;
};

const EMPTY_STRING = "";

const ModelLearningContent = () => {
  const [activeStep, setActiveStep] = useState(4);

  function decreaseStep() {
    setActiveStep(activeStep - 1);
  }

  function increaseStep() {
    setActiveStep(activeStep + 1);
  }

  // step1
  const [fileChanged, setFileChanged] = useState(false);

  // step2
  const [anyTargetVariableChecked, setAnyTargetVariableChecked] = useState(
    false
  );

  // step3
  const [anyTargetVariableUsed, setAnyTargetVariableUsed] = useState(false);

  // step4
  const [learnModelRequest, dispatchLearnModelRequest] = useReducer(
    LearnModelRequestReducer,
    INIT_LEARN_MODEL_REQUEST
  );
  const [allLearnModelRequestFilled, setAllLearnModelRequestFilled] = useState(
    true
  );

  useEffect(() => {
    checkHasEmptyAndSetState(learnModelRequest);
  }, [learnModelRequest]);

  function checkHasEmptyAndSetState(_learnModelRequest) {
    if (hasEmptyValue(_learnModelRequest)) {
      setAllLearnModelRequestFilled(false);
    } else {
      setAllLearnModelRequestFilled(true);
    }
  }

  function hasEmptyValue(_learnModelRequest) {
    return Object.values(_learnModelRequest)
      .map((it) => it.toString().trim())
      .includes(EMPTY_STRING);
  }

  function handleDisableNextStepButton() {
    if (activeStep >= MAX_STEP) {
      return true;
    }

    if (activeStep === 1) {
      if (!fileChanged) {
        return true;
      }
    }

    if (activeStep === 2) {
      if (!anyTargetVariableChecked) {
        return true;
      }
    }

    if (activeStep === 3) {
      if (!anyTargetVariableUsed) {
        return true;
      }
    }

    if (activeStep === 4) {
      if (!allLearnModelRequestFilled) {
        return true;
      }
    }

    return false;
  }

  return (
    <>
      <ModelLearningTypography />
      <Divider
        sx={{
          marginTop: "5px",
        }}
      />
      <StepperBox activeStep={activeStep} />
      <StepNameBox activeStep={activeStep} />
      <ModelLearningMainContentWrappingBox>
        <ModelLearningMainContent
          activeStep={activeStep}
          fileChanged={fileChanged}
          setFileChanged={setFileChanged}
          setAnyTargetVariableChecked={setAnyTargetVariableChecked}
          setAnyTargetVariableUsed={setAnyTargetVariableUsed}
          dispatchLearnModelRequest={dispatchLearnModelRequest}
          setAllLearnModelRequestFilled={setAllLearnModelRequestFilled}
        />
      </ModelLearningMainContentWrappingBox>
      <StepButtonsWrappingBox>
        <Box
          sx={{
            margin: "20px",
          }}
        >
          <PreviousStepButton
            disabled={activeStep <= MIN_STEP}
            onClick={() => decreaseStep()}
          />
          <NextStepButton
            disabled={handleDisableNextStepButton()}
            onClick={() => increaseStep()}
          />
        </Box>
      </StepButtonsWrappingBox>
    </>
  );
};

export default ModelLearningContent;
