import React, {useState} from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import {Divider, StepLabel, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ModelLearningMainContent from "./ModelLearningMainContent";

export const CONTENT_NAME_HEIGHT = '50px';

const CONTENT_BACKGROUND_COLOR = '#F4F8F9';

const STEP_COUNT_AND_NAME_MAP = {
  1: '데이터 입력',
  2: '데이터 탐색',
  3: '특징 선택',
  4: '알고리즘 선택',
  5: '모델 학습 결과',
};
const STEPS = Object.keys(STEP_COUNT_AND_NAME_MAP);
const MIN_STEP = Math.min(...STEPS);
const MAX_STEP = Math.max(...STEPS);

const ModelLearningContent = () => {
  const [activeStep, setActiveStep] = useState(1);

  function decreaseStep() {
    setActiveStep(activeStep - 1);
  }

  function increaseStep() {
    setActiveStep(activeStep + 1);
  }

  // step1
  const [fileChanged, setFileChanged] = useState(false);

  // step2
  const [anyTargetVariableChecked, setAnyTargetVariableChecked] = useState(false);

  // step3
  const [anyTargetVariableUsed, setAnyTargetVariableUsed] = useState(false);

  function handleDisableNextButton() {
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

    return false;
  }

  return (
    <>
      <Typography variant="h5">
        모델 학습
      </Typography>
      <Divider sx={{
        marginTop: '5px'
      }}/>
      <Box sx={{
        marginTop: '30px'
      }}>
        <Stepper
          activeStep={activeStep - 1} // 0부터 시작
          // nonLinear
          alternativeLabel
        >
          {Object.values(STEP_COUNT_AND_NAME_MAP).map((it) => (
            <Step key={it} sx={{
              marginTop: '12px'
            }}>
              <StepLabel>
                {it}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{
        backgroundColor: CONTENT_BACKGROUND_COLOR,
        height: CONTENT_NAME_HEIGHT
      }}>
        <Box sx={{
          marginTop: '50px',
          padding: '15px',
        }}>
          <Typography variant="h4">
            {STEP_COUNT_AND_NAME_MAP[activeStep]}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        backgroundColor: CONTENT_BACKGROUND_COLOR,
        minHeight: '450px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {
          <ModelLearningMainContent
            activeStep={activeStep}
            fileChanged={fileChanged}
            setFileChanged={setFileChanged}
            setAnyTargetVariableChecked={setAnyTargetVariableChecked}
            setAnyTargetVariableUsed={setAnyTargetVariableUsed}
          />
        }
      </Box>
      <Box sx={{
        backgroundColor: CONTENT_BACKGROUND_COLOR,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '110px'
      }}>
        <Box sx={{
          margin: '20px'
        }}>
          <Button
            disabled={(activeStep <= MIN_STEP)}
            variant="outlined"
            onClick={() => decreaseStep()}
          >
            이전
          </Button>
          <Button
            disabled={
              handleDisableNextButton()
            }
            variant="contained"
            onClick={() => increaseStep()}
            sx={{
              marginLeft: '15px'
            }}
          >
            다음
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ModelLearningContent;
