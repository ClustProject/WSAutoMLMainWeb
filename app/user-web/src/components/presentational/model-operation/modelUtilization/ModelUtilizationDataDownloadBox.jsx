import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../../authentication/AuthContext";

const URL = "https://automl-file-storage-test.s3.ap-northeast-2.amazonaws.com/";

const ModelUtilizationDataDownloadBox = (props) => {
  const { work } = props;
  const { user } = useAuth();

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
    <Button
      variant='outlined'
      sx={{ height: "56px" }}
      onClick={handleButtonClick}
    >
      {buttonText}
    </Button>
  );
};

export default ModelUtilizationDataDownloadBox;
