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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteModelLearningResult } from "../../../api/api";

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
  const [toBeDeletedId, setToBeDeletedId] = useState(null);
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
      field: "function",
      headerName: "기능",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isCompleted = params.row.state === "학습완료";
        return (
          <div>
            <IconButton color='warning' aria-label='delete'>
              <DeleteIcon
                onClick={() => {
                  setToBeDeletedId(params.row.id);
                  setOpenDialog(true);
                }}
              />
            </IconButton>
            <IconButton color='info' aria-label='edit'>
              <EditIcon
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
              color={isCompleted ? "success" : "disabled"}
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
              <DownloadIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleDelete = () => {
    deleteModelLearningResult(toBeDeletedId).then(() => {
      window.location.reload();
    });
    setOpenDialog(false);
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
      console.log(selectedRow);
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

  // rows가 비어있는 경우를 처리
  // if (!rows || rows.length === 0) {
  //   return <CircularProgress />;
  // }

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: "44%",
          marginRight: "1%",
          "& .super-app-theme--header": {
            backgroundColor: "#7986CB",
            color: "#FFFFFF",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          onSelectionModelChange={(newSelection) => {
            setSelectedRowId(newSelection[0]);
          }}
          hideFooter
          headerHeight={50}
          autoHeight={false}
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"삭제 확인"}</DialogTitle>
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
    </>
  );
};

export default ModelOperationSelectGrid;
