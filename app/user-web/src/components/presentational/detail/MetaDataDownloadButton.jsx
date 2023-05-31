import Button from "@mui/material/Button";
import React from "react";

function MetaDataDownloadButton(props) {
  const handleButtonClick = () => {
    window.location.href = props.fileDownloadUrl;
  };

  return (
    <Button variant='outlined' onClick={handleButtonClick}>
      CSV 파일 다운로드
    </Button>
  );
}

export default MetaDataDownloadButton;
