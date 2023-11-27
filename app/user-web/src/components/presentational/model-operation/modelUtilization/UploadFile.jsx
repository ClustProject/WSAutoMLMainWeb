import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Modal,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getPreSignedUrl, uploadFileToS3 } from "../../../../api/s3";

const centerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const UploadFile = (props) => {
  const { setUploadedFileUrl } = props;
  const [fileName, setFileName] = useState("");
  const [fileUploadPercent, setFileUploadPercent] = useState(0);
  const [progressBarOpend, setProgressBarOpend] = useState(false);

  const displayProgressBar = () => {
    setProgressBarOpend(true);
  };

  const closeProgressBar = () => {
    setProgressBarOpend(false);
  };

  const handleUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFile = event.target.files[0];
      const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

      if (fileExtension !== "csv") {
        window.alert(".csv파일만 업로드 가능합니다");
        return;
      }

      try {
        const { uploadUrl, downloadUrl } = await getPreSignedUrl(
          uploadedFile.name
        );

        setFileName(uploadedFile.name);
        displayProgressBar();

        await uploadFileToS3(uploadUrl, uploadedFile, setFileUploadPercent);

        closeProgressBar();
        setUploadedFileUrl(downloadUrl);
      } catch (err) {
        if (err.response.data.errors) {
          alert(err.response.data.errors[0].defaultMessage);
          return;
        }

        if (err.response.data.message) {
          alert(err.response.data.message);
          return;
        }

        alert("예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요");
      }
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
        <input
          id='file'
          type='file'
          hidden
          onChange={handleUpload}
          accept='.csv'
        />
      </Button>
      {fileName && (
        <Box ml={2}>
          <Typography variant='body1'>{fileName}</Typography>
        </Box>
      )}
      <Modal
        open={progressBarOpend}
        onClose={!progressBarOpend}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        sx={{
          ...centerStyle,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            ...centerStyle,
          }}
        >
          <CircularProgress variant='determinate' value={fileUploadPercent} />
          <Box
            sx={{
              position: "absolute",
              ...centerStyle,
            }}
          >
            <Typography
              variant='caption'
              component='div'
              color='text.secondary'
            >
              {fileUploadPercent}%
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadFile;
