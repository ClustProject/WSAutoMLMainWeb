import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadFile = () => {
  const [fileName, setFileName] = useState("");

  const handleUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFile = event.target.files[0];
      const fileExtension = uploadedFile.name
        .split(".")
        .pop()
        .toLowerCase();

      if (fileExtension !== "csv") {
        window.alert(".csv파일만 업로드 가능합니다");
        return;
      }

      setFileName(uploadedFile.name);
    }
  };

  return (
    <Box display='flex' alignItems='center' sx={{ marginBlock: "10px" }}>
      <Button
        variant='contained'
        component='label'
        startIcon={<CloudUploadIcon />}
      >
        파일 업로드
        <input type='file' hidden onChange={handleUpload} accept='.csv' />
      </Button>
      {fileName && (
        <Box ml={2}>
          <Typography variant='body1'>{fileName}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UploadFile;
