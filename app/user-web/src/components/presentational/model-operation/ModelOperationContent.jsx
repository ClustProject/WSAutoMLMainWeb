import {
  Link,
  Chip,
  Divider,
  Paper,
  StepLabel,
  Typography,
} from "@mui/material";
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
  console.log(selectedRow);
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
        if (selectedRow.state !== "학습완료") {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}
            >
              <Typography variant='h6'>
                모델 학습이 완료되지 않았습니다.
              </Typography>
            </Box>
          );
        } else {
          return <ModelOperationResultChart resultId={selectedRow.id} />;
        }
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
        {data.length > 0 ? (
          <>
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
                <StepperBox
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
                {switchModelLearningMainContent()}
              </Paper>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // 세로 방향으로 배치
              justifyContent: "center", // 세로 방향에서 중앙에 배치
              alignItems: "center", // 가로 방향에서 중앙에 배치
              height: "100%", // 부모 컴포넌트(ModelLearningMainContentWrappingBox)의 높이를 차지하도록 설정
              gap: 2, // Typography와 Chip 사이에 간격을 만듭니다.
            }}
          >
            <Typography variant='h5'>생성된 모델이 없습니다.</Typography>
            <Link href='/model-learning'>
              <Chip label='모델 생성' color='primary' clickable />
            </Link>
          </Box>
        )}
      </ModelLearningMainContentWrappingBox>
      <StepButtonsWrappingBox></StepButtonsWrappingBox>
    </>
  );
};

export default ModelOperationContent;
