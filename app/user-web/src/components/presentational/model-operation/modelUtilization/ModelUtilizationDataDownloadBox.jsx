import React, { useState, useEffect, memo } from "react";
import { useAuth } from "../../../authentication/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { getModelOperationStatus } from "../../../../api/api";

const URL = "https://automl-file-storage.s3.ap-northeast-2.amazonaws.com/";

// LoadingButton 컴포넌트를 memo로 감싸서 성능 최적화
const MemoizedLoadingButton = memo(({ onClick, isLoading, buttonText }) => {
  return (
    <LoadingButton
      loading={isLoading}
      variant='outlined'
      loadingPosition='center'
      sx={{ height: "56px" }}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "" : buttonText}
    </LoadingButton>
  );
});

const ModelUtilizationDataDownloadBox = (props) => {
  const { work } = props;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        // 데이터를 불러오고 상태를 업데이트합니다.
        const operationStatus = await getModelOperationStatus();

        const parsedPredRowState = operationStatus.predRowState
          ? JSON.parse(operationStatus.predRowState)
          : null;
        const parsedPredImpState = operationStatus.predImpState
          ? JSON.parse(operationStatus.predImpState)
          : null;

        if (work === "predict" && parsedPredRowState) {
          setIsLoading(false);
        } else if (work === "interpolate" && parsedPredImpState) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error("Error parsing status:", error);
      }
    };

    // 상태 업데이트 함수를 호출합니다.
    updateStatus();
    const interval = setInterval(() => {
      updateStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [work]);

  let buttonText;
  if (work === "predict") {
    buttonText = "예측데이터 다운로드";
  } else if (work === "interpolate") {
    buttonText = "보간데이터 다운로드";
  }

  const handleButtonClick = () => {
    window.location.href = URL + work + user.id + ".csv";
  };

  return (
    <MemoizedLoadingButton
      onClick={handleButtonClick}
      isLoading={isLoading}
      buttonText={buttonText}
    />
  );
};

export default ModelUtilizationDataDownloadBox;
