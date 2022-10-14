import React, {useState} from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import {Divider, StepLabel, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import DataInputBox from "./DataInputBox";

export const CONTENT_NAME_HEIGHT = '50px';
const CONTENT_BACKGROUND_COLOR = '#F4F8F9';

const STEP_COUNT_AND_NAME_MAP = {
  0: '데이터 입력',
  1: '데이터 탐색',
  2: '특징 선택',
  3: '알고리즘 선택',
  4: '모델 학습 결과',
};

const STEPS = Object.keys(STEP_COUNT_AND_NAME_MAP);
const MIN_STEP = Math.min(...STEPS);
const MAX_STEP = Math.max(...STEPS);

function ModelLearningMainContent(props) {
  const {activeStep} = props;

  if (activeStep === 0) {
    const {fileChanged, setFileChanged} = props;

    return <DataInputBox
      fileChanged={fileChanged}
      setFileChanged={setFileChanged}
    />
  }
}

function ModelLearningContent() {
  const [fileChanged, setFileChanged] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
          activeStep={activeStep}
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
        height: '450px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {
          <ModelLearningMainContent
            activeStep={activeStep}
            fileChanged={fileChanged}
            setFileChanged={setFileChanged}
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
            onClick={() => decreaseStep(activeStep, setActiveStep)}
          >
            이전
          </Button>
          <Button
            disabled={
              (activeStep >= MAX_STEP)
              || (!fileChanged)
            }
            variant="contained"
            onClick={() => increaseStep(activeStep, setActiveStep)}
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

function decreaseStep(activeStep, setActiveStep) {
  setActiveStep(activeStep - 1);
}

function increaseStep(activeStep, setActiveStep) {
  setActiveStep(activeStep + 1);
}

export default ModelLearningContent;
