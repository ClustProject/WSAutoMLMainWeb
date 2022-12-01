import Button from "@mui/material/Button";
import React from "react";

function MetaDataDownloadButton() {
  return (
    <Button
      variant="outlined"
      href={"https://automl-file-storage.s3.ap-northeast-2.amazonaws.com/20220804-041252-SURFACE_ASOS_95_MI_2022-01_2022-01_2022.csv"}
    >
      CSV 파일 다운로드
    </Button>
  );
}

export default MetaDataDownloadButton;
