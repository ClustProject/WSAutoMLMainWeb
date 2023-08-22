import React from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

const ModelLearningStepperBox = (props) => {
  return (
    <Box
      sx={{
        marginTop: "25px",
      }}
    >
      <Stepper
        activeStep={props.activeStep - 1} // 0부터 시작
        // nonLinear
        alternativeLabel
      >
        {Object.values(props.steps).map((it) => (
          <Step key={it}>
            <StepLabel>{it}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ModelLearningStepperBox;
