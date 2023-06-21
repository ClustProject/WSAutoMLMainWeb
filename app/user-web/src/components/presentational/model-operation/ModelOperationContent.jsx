import { Chip, Divider, Paper, StepLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";
import ModelOperationResultBox from "./ModelOperationResultBox";
import ModelOperationSelectGrid from "./ModelOperationSelectGrid";
import ModelOperationResultChart from "./ModelOperationResultChart";
import ModelOperationDashboard from "./ModelOperationDashboard";
import { getModelLearningResult } from "../../../api/api";
import { useAuth } from "../../authentication/AuthContext";

export const CONTENT_NAME_HEIGHT = "50px";
export const CONTENT_BACKGROUND_COLOR = "#F4F8F9";

const STEP_COUNT_AND_NAME_MAP = {
  1: "모델 상세 정보",
  2: "분석 결과 시각화",
};

const ModelLearningMainContentWrappingBox = styled(Box)({
  backgroundColor: CONTENT_BACKGROUND_COLOR,
  minHeight: "550px",
  display: "grid",
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

const StepperBox = (props) => {
  // 해당 스텝을 클릭 시 activeStep값을 변경
  const handleClick = (step) => {
    props.setActiveStep(step);
  };

  return (
    <Box
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Stepper
        activeStep={props.activeStep - 1} // 0부터 시작
        // nonLinear
        alternativeLabel
      >
        {Object.values(STEP_COUNT_AND_NAME_MAP).map((it, index) => (
          <Step
            key={it}
            sx={{
              marginTop: "12px",
            }}
            onClick={() => handleClick(index + 1)}
          >
            <StepLabel>{it}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const ModelLearningTypography = () => {
  return <Typography variant='h4'>모델 운영</Typography>;
};

const ModelOperationContent = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getModelLearningResult()
      .then((it) => {
        console.log(it);
        setData(it);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, [user]);

  // step1
  const [selectedRow, setSelectedRow] = useState(null);

  const onRowSelect = (row) => {
    setSelectedRow(row);
  };

  const switchModelLearningMainContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <ModelOperationResultBox
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          </>
        );
      case 2:
        return <ModelOperationResultChart resultId={selectedRow.id} />;
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
      <ModelOperationDashboard data={data} />
      <ModelLearningMainContentWrappingBox sx={{ display: "flex" }}>
        <ModelOperationSelectGrid onRowSelect={onRowSelect} data={data} />
        <Box
          sx={{
            display: "grid",
            height: "100%",
            width: "44%",
            marginLeft: "1%",
          }}
        >
          <Paper
            sx={{
              height: 500,
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <Chip
              label={selectedRow ? selectedRow.modelNm : "Model Name"}
              sx={{
                fontSize: "20px",
                marginTop: "1rem",
                backgroundColor: "#9fa8da",
                color: "#fff",
              }}
            />
            <StepperBox activeStep={activeStep} setActiveStep={setActiveStep} />
            {switchModelLearningMainContent()}
          </Paper>
        </Box>
      </ModelLearningMainContentWrappingBox>
      <StepButtonsWrappingBox></StepButtonsWrappingBox>
    </>
  );
};

export default ModelOperationContent;
