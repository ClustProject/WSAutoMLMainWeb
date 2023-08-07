import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

const UploadFile = () => {
  const [fileName, setFileName] = useState("");

  const handleUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <Box>
      <Button variant='contained' component='label'>
        파일 업로드
        <input type='file' hidden onChange={handleUpload} />
      </Button>
      {fileName && <Typography variant='body1'>{fileName}</Typography>}
    </Box>
  );
};

export default UploadFile;
