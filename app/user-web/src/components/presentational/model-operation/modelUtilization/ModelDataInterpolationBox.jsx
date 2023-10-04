import React from "react";
import { styled } from "@mui/system";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ContentWrappingBox = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const SpaceBetweenFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
});

const ModelDataInterpolationBox = (props) => {
  const { open, onClose, selectedRowData } = props;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h5'>데이터 보간 - 파라미터 설정</Typography>
            <IconButton
              edge='end'
              color='inherit'
              onClick={onClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <ContentWrappingBox>
            <Box
              sx={{
                overflow: "auto",
                height: "100%",
                padding: "25px",
                width: "100%",
              }}
            >
              <SpaceBetweenFlexBox>구현 예정</SpaceBetweenFlexBox>
            </Box>
          </ContentWrappingBox>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModelDataInterpolationBox;
