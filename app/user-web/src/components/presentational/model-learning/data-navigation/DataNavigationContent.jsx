import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import DataNavigationContentTable from "./DataNavigationContentTable";
import DataNavigationHeatMapChartBox from "./DataNavigationHeatMapChartBox";
import { useAuth } from "./../../../authentication/AuthContext";

/**
 * 데이터 탐색 콘텐츠
 */
const DataNavigationContent = (props) => {
  const [heatMapData, setHeatMapData] = useState(null);
  const {
    setAnyTargetVariableChecked,
    downloadUrl,
    setPayload,
    resultId,
    setResultId,
  } = props;
  const { user } = useAuth();

  const [content, setContent] = useState(null);

  const [isOpen, setIsOpen] = useState(false); // 모달창 열림 여부 상태

  function getNavigationContent() {
    const data = {
      url: downloadUrl,
      user_id: user.id,
    };
    // console.log("Sending data:", data);

    if (!resultId) {
      // console.log("data_info");

      fetch("http://52.79.123.200:8797/v1/data_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Received data:", data);
          setContent(data);
          setResultId(data.result_id);
        })
        .catch((error) => console.error("Error occurred:", error));
    } else {
      // console.log("data_edit");

      fetch("http://52.79.123.200:8797/v1/data_edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Received data:", data);
          setContent(data);
        })
        .catch((error) => console.error("Error occurred:", error));
    }
  }

  useEffect(() => {
    getNavigationContent();
  }, []);

  const handleHeatmapClick = () => {
    const data = {
      url: downloadUrl,
    };

    // console.log("Sending data:", data);
    setIsOpen(true);

    fetch("http://52.79.123.200:8797/v1/heatmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Received data:", data);
        setHeatMapData(data);
      })
      .catch((error) => console.error("Error occurred:", error));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!content) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "90%",
      }}
    >
      <Typography
        variant='subtitle1'
        align='right'
        sx={{
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        데이터셋 정보(데이터 개수 : {content.total_row}, 결측치 :
        {content.total_null})
      </Typography>

      {content.data && (
        <DataNavigationContentTable
          data={content.data}
          downloadUrl={downloadUrl}
          setAnyTargetVariableChecked={setAnyTargetVariableChecked}
          setPayload={setPayload}
          resultId={resultId}
          setResultId={setResultId}
          totalRow={content.total_row}
        />
      )}
      <br />
      <Button variant='contained' onClick={handleHeatmapClick}>
        변수간 상관관계 분석
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth='md'
        fullWidth={true}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <DialogTitle sx={{ flexGrow: 1 }}>변수간 상관관계</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent
          sx={{
            textAlign: "center",
          }}
        >
          {heatMapData ? (
            <DataNavigationHeatMapChartBox heatMapData={heatMapData} />
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DataNavigationContent;
