import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Divider,
} from "@mui/material";

function SetModelName(props) {
  const { payload, open, onClose } = props;
  const [modelName, setModelName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleNameChange = (event) => {
    setModelName(event.target.value);
  };

  const handleSubmit = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    getNavigationContent();
    onClose();
    window.location.href = "/model-operation";
  };

  function getNavigationContent() {
    const data = {
      ...payload,
      model_nm: modelName,
    };

    delete data["selected_var"];

    // console.log("Sending data:", data);

    fetch("http://52.79.123.200:8797/v1/ml", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Received data:", data);
      })
      .catch((error) => console.error("Error occurred:", error));
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>모델명 입력</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>* 저장할 모델명을 입력해주세요.</DialogContentText>
          <TextField
            autoFocus='true'
            margin='dense'
            label='모델명 입력 부분'
            value={modelName}
            onChange={handleNameChange}
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color='primary'>
            저장하기
          </Button>
          <Button onClick={onClose} color='primary'>
            취소
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={alertOpen} onClose={handleAlertClose}>
        <DialogTitle>확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            모델학습을 시작합니다. <br />
            모델학습이 완료되면 모델운영 페이지에서 확인 가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color='primary'>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SetModelName;
