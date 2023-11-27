import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/DownloadRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import PlayCircleOutLineIcon from "@mui/icons-material/PlayCircleOutline";
import { deleteModelLearningResult } from "../../../api/api";
import { deleteFileFromS3 } from "../../../api/s3";
import ModelTimeSeriesProcesser from "./modelUtilization/ModelTimeSeriesProcesser";

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const ModelOperationSelectGrid = (props) => {
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openTimeSeriesModal, setOpenTimeSeriesModal] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState(null);
  const [toBeDeletedS3, setToBeDeletedS3] = useState(null);

  const navigate = useNavigate();

  const columns = [
    {
      field: "modelNm",
      headerName: "모델명",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "학습날짜",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "distributionTitle",
      headerName: "데이터셋 명",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state",
      headerName: "상태",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "manage",
      headerName: "모델 관리",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isCompleted = params.row.state === "학습완료";
        return (
          <div>
            <IconButton aria-label='delete'>
              <DeleteIcon
                onClick={() => {
                  if (params.row.modelUrl) {
                    const key = params.row.modelUrl.split("/").pop();
                    setToBeDeletedS3(key);
                  }
                  setToBeDeletedId(params.row.id);
                  setOpenDialog(true);
                }}
                sx={{ color: "#8FBC8F" }}
              />
            </IconButton>
            <IconButton aria-label='edit'>
              <EditIcon
                sx={{ color: "#5F9EA0" }}
                onClick={() => {
                  navigate("/model-learning", {
                    state: {
                      activeStep: 2,
                      resultId: params.row.id,
                      downloadUrl: params.row.downloadUrl,
                    },
                  });
                }}
              />
            </IconButton>
            <IconButton
              aria-label='download'
              onClick={
                isCompleted
                  ? () => {
                      window.location.href = params.row.modelUrl;
                    }
                  : () => {
                      alert("모델 학습이 완료된 모델만 다운로드가 가능합니다.");
                    }
              }
            >
              <DownloadIcon
                sx={{ color: isCompleted ? "#6495ED" : "inherit" }}
              />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: "utilization",
      headerName: "모델 활용",
      flex: 0.7,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isCompleted = params.row.state === "학습완료";
        return (
          <div>
            <IconButton
              aria-label='utilization'
              onClick={
                isCompleted
                  ? () => {
                      setSelectedRowData({
                        argParamJSON: JSON.parse(params.row.argParam),
                        varNmJSON: JSON.parse(params.row.varNm),
                        varTgYnJSON: JSON.parse(params.row.varTgYn),
                        varUseYnJSON: JSON.parse(params.row.varUseYn),
                        ...params.row,
                      });
                      setOpenTimeSeriesModal(true);
                    }
                  : () => {
                      alert(
                        "모델 학습이 완료된 모델만 모델 활용이 가능합니다."
                      );
                    }
              }
            >
              <PlayCircleOutLineIcon
                sx={{ color: isCompleted ? "#4169E1" : "inherit" }}
              />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleDelete = async () => {
    try {
      if (toBeDeletedS3) {
        const filesToDelete = [
          toBeDeletedS3,
          `${toBeDeletedId} history.png`,
          `${toBeDeletedId} prediction.png`,
        ];
        await deleteFileFromS3(filesToDelete);
      }
      await deleteModelLearningResult(toBeDeletedId);
      window.location.reload();
    } catch (error) {
      alert(
        `모델을 삭제하는데 실패하였습니다. 시스템 관리자에게 문의하시기 바랍니다. : ${error.message}`
      );
    } finally {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    /**
     * data grid에서 row로 읽을 수 있도록 파싱합니다.
     */
    function parseToRows(results) {
      if (!results) {
        return [];
      }
      return results.map((result) => {
        return {
          ...result.result,
          date: formatDate(result.result.date),
          distributionTitle: result.distribution.title,
          downloadUrl: result.distribution.downloadUrl,
        };
      });
    }

    setRows(parseToRows(props.data));
  }, [props.data]);

  useEffect(() => {
    // 선택한 행의 mlResultId의 값 전송
    if (selectedRowId) {
      const selectedRow = rows.find((row) => row.id === selectedRowId);

      props.onRowSelect(selectedRow);
    }
  }, [selectedRowId]);

  useEffect(() => {
    // rows가 업데이트되면 DataGrid를 다시 렌더링합니다.
    if (rows.length > 0) {
      // 첫 번째 행의 id를 가져옴
      const firstRowId = rows[0].id;
      // 첫 번째 행을 선택함
      setSelectedRowId(firstRowId);
    }
  }, [rows]);

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: "44%",
          marginRight: "1%",
          overflowX: "auto",
          borderRadius: "4px",
          "& .super-app-theme--header": {
            backgroundColor: "#7986CB",
            color: "#FFFFFF",
          },
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          onSelectionModelChange={(newSelection) => {
            setSelectedRowId(newSelection[0]);
            const selectedRow = rows.find((row) => row.id === newSelection[0]);
            props.onRowSelect(selectedRow);
          }}
          hideFooter
          headerHeight={50}
          autoHeight={false}
          sx={{ minWidth: "650px" }}
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"삭제 확인"}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            선택한 항목을 정말로 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
      <ModelTimeSeriesProcesser
        open={openTimeSeriesModal}
        onClose={() => setOpenTimeSeriesModal(false)}
        selectedRowData={selectedRowData}
      />
    </>
  );
};

export default ModelOperationSelectGrid;
