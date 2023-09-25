import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Paper, Modal, Box, IconButton, Typography } from "@mui/material";

const ModelOperationResultChart = (props) => {
  const { resultId } = props;
  const [imageUrl, setImageUrl] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const imageHeaders = ["예측 결과 비교", "History"];

  const handleOpen = (url) => {
    setModalImage(url);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const baseImageUrl = `https://automl-file-storage-test.s3.ap-northeast-2.amazonaws.com/${resultId}`;
    let urls = ["prediction.png", "history.png"].map(
      (end) => baseImageUrl + " " + end
    );

    setImageUrl(urls);
  }, [resultId]);

  return (
    <>
      <Paper
        sx={{
          height: "330px",
          backgroundColor: "#F4F8F9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: "10px",
          }}
        >
          {imageUrl.length > 0 &&
            imageUrl.map((url, index) => (
              <>
                <Box
                  sx={{
                    display: "flex-top",
                    flexDirection: "column",
                    height: "330px",
                    flexGrow: 1,
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    align='center'
                    style={{ flex: index === 0 ? 15 : 8 }}
                  >
                    {imageHeaders[index]}
                  </Typography>
                  <img
                    src={url}
                    alt={`S3 이미지 ${index + 1}`}
                    style={{
                      flex: index === 0 ? 15 : 8,
                      width: "100%",
                      maxHeight: "300px",
                      borderRadius: "10px", // 이미지 모서리를 둥글게 설정
                      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
                    }}
                    onClick={() => handleOpen(url)}
                  />
                </Box>
              </>
            ))}
        </Box>
      </Paper>
      <Typography
        variant='subtitle1'
        sx={{
          fontSize: "14px",
          color: "#D0021B",
          textAlign: "right",
        }}
      >
        ※ 이미지를 클릭하면 확대됩니다.
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "45%",
            height: "70%",
            bgcolor: "background.paper",
            p: 2,
            overflow: "auto",
            borderRadius: "10px", // 모서리를 둥글게 설정
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
            }}
          >
            <Typography variant='h6'>분석 결과</Typography>
          </Box>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={modalImage}
            alt='확대 이미지'
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModelOperationResultChart;
