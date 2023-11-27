import { Divider, Tooltip, Typography, IconButton, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import React, { useEffect, useReducer, useState } from "react";
import DataInputBox from "./data-input/DataInputBox";
import DataNavigationContent from "./data-navigation/DataNavigationContent";
import FeatureSelectionContent from "./feature-selection/FeatureSelectionContent";
import LearnModelRequestReducer, {
  INIT_LEARN_MODEL_REQUEST,
} from "./select-algorithm/reducers/LearnModelRequestReducer";
import SelectAlgorithmContent from "./select-algorithm/SelectAlgorithmContent";
import InfoIcon from "@mui/icons-material/Info";
import SetModelName from "./select-algorithm/SetModelName";
import ModelLearningStepperBox from "./ModelLearningStepperBox";

export const CONTENT_NAME_HEIGHT = "50px";
export const CONTENT_BACKGROUND_COLOR = "#F4F8F9";

const STEP_COUNT_AND_NAME_MAP = {
  1: "메타데이터 선택",
  2: "데이터 탐색",
  3: "특징 선택",
  4: "알고리즘 선택",
};

const STEPS = Object.keys(STEP_COUNT_AND_NAME_MAP);
const MIN_STEP = Math.min(...STEPS);
const MAX_STEP = Math.max(...STEPS);

const EMPTY_STRING = "";

const ModelLearningMainContentWrappingBox = styled(Box)({
  backgroundColor: CONTENT_BACKGROUND_COLOR,
  minHeight: "450px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
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
    <Button variant='outlined' disabled={disabled} onClick={onClick}>
      이전
    </Button>
  );
};

const NextStepButton = (props) => {
  const { onClick, disabled, payload } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {props.isFirstStep ? (
        <Button
          variant='contained'
          sx={{
            marginLeft: "15px",
          }}
          disabled={disabled}
          onClick={() => {
            onClick();
          }}
        >
          다음
        </Button>
      ) : props.isLastStep ? (
        <Button
          variant='contained'
          sx={{
            marginLeft: "15px",
          }}
          onClick={handleButtonClick}
        >
          학습하기
        </Button>
      ) : (
        <Button
          variant='contained'
          sx={{
            marginLeft: "15px",
          }}
          disabled={disabled}
          onClick={onClick}
        >
          다음
        </Button>
      )}
      <SetModelName
        open={dialogOpen}
        onClose={handleDialogClose}
        payload={payload}
      />
    </>
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
          padding: "15px",
          paddingLeft: "5%",
        }}
      >
        <Typography variant='h5'>
          {STEP_COUNT_AND_NAME_MAP[props.activeStep]}
          {props.activeStep === 1 && (
            <Tooltip
              title='메타데이터에 등록된 데이터만 선택 가능합니다.'
              placement='right'
            >
              <IconButton>
                <InfoIcon color='primary' />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

const ModelLearningTypography = () => {
  return <Typography variant='h4'>모델 학습</Typography>;
};

const ModelLearningContent = () => {
  const location = useLocation();

  // 모델운영페이지에서 모델 수정에 필요한 초기값 설정
  const defaultResultId =
    location.state && location.state.resultId ? location.state.resultId : false;
  const defaultDownloadUrl =
    location.state && location.state.downloadUrl
      ? location.state.downloadUrl
      : null;
  const defaultActiveStep =
    location.state && location.state.activeStep ? location.state.activeStep : 1;

  const [downloadUrl, setDownloadUrl] = useState(defaultDownloadUrl);
  const [resultId, setResultId] = useState(defaultResultId);
  const [activeStep, setActiveStep] = useState(defaultActiveStep);
  const [payload, setPayload] = useState(null);

  function decreaseStep() {
    setActiveStep(activeStep - 1);
  }

  function increaseStep() {
    setActiveStep(activeStep + 1);
  }

  // step1
  const [selectedRow, setSelectedRow] = useState(false);

  // step2
  const [anyTargetVariableChecked, setAnyTargetVariableChecked] =
    useState(false);

  // step3
  const [anyTargetVariableUsed, setAnyTargetVariableUsed] = useState(false);

  // step4
  const [learnModelRequest, dispatchLearnModelRequest] = useReducer(
    LearnModelRequestReducer,
    INIT_LEARN_MODEL_REQUEST
  );
  const [allLearnModelRequestFilled, setAllLearnModelRequestFilled] =
    useState(true);

  useEffect(() => {
    setDownloadUrl(downloadUrl);
  }, [downloadUrl]);

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
      if (!selectedRow) {
        return true;
      }
    }

    // 목표변수 지정 및 목표변수를 제외한 사용할 변수 1 이상
    if (activeStep === 2) {
      if (
        !anyTargetVariableChecked ||
        (payload && payload.selected_var.length < 1)
      ) {
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

  const switchModelLearningMainContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <DataInputBox
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              downloadUrl={downloadUrl}
              setDownloadUrl={setDownloadUrl}
            />
          </>
        );
      case 2:
        return (
          <DataNavigationContent
            setAnyTargetVariableChecked={setAnyTargetVariableChecked}
            downloadUrl={downloadUrl}
            setPayload={setPayload}
            setResultId={setResultId}
            resultId={resultId}
          />
        );
      case 3:
        return (
          <FeatureSelectionContent
            setAnyTargetVariableUsed={setAnyTargetVariableUsed}
            payload={payload}
            setPayload={setPayload}
            resultId={resultId}
          />
        );
      case 4:
        return (
          <SelectAlgorithmContent
            dispatchLearnModelRequest={dispatchLearnModelRequest}
            setAllLearnModelRequestFilled={setAllLearnModelRequestFilled}
            downloadUrl={downloadUrl}
            payload={payload}
            setPayload={setPayload}
          />
        );
      default:
        throw new Error("해당 스텝에 대한 컨텐츠를 찾을 수 없습니다.");
    }
  };

  return (
    <>
      <ModelLearningTypography />
      <Divider
        sx={{
          marginTop: "5px",
        }}
      />
      <Box sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
        <Paper elevation={3} sx={{ p: "1rem", height: 100 }}>
          <ModelLearningStepperBox
            activeStep={activeStep}
            steps={STEP_COUNT_AND_NAME_MAP}
          />
        </Paper>
      </Box>
      <StepNameBox activeStep={activeStep} />
      <ModelLearningMainContentWrappingBox>
        {switchModelLearningMainContent()}
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
            isFirstStep={activeStep === MIN_STEP}
            isLastStep={activeStep === MAX_STEP}
            disabled={handleDisableNextStepButton()}
            onClick={() => increaseStep()}
            downloadUrl={downloadUrl}
            payload={payload}
          />
        </Box>
      </StepButtonsWrappingBox>
    </>
  );
};

export default ModelLearningContent;
