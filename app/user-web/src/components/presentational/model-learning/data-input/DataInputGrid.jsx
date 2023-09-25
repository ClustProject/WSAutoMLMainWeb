import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getMetadatas } from "../../../../api/api.js";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  {
    field: "category",
    headerName: "카테고리",
    flex: 1,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "keyword",
    headerName: "키워드",
    flex: 1,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "title",
    headerName: "제목",
    flex: 1,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "distributionDescription",
    headerName: "배포 파일 설명",
    flex: 1,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "distributionTitle",
    headerName: "배포 파일 이름",
    flex: 1,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
];

const DataInputGrid = (props) => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    getMetadatas()
      .then((it) => {
        console.log(it);
        setData(it);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  useEffect(() => {
    /**
     * data grid에서 row로 읽을 수 있도록 파싱합니다.
     */
    function parseToRows(metadatas) {
      if (!metadatas) {
        return [];
      }
      return metadatas.map((metadata) => {
        return {
          ...metadata.catalog,
          ...metadata.dataSet,
          ...metadata.dataSet.organization,
          ...metadata.dataSet.organization.contactPoint,
          ...metadata.dataSet.licenseInfo,
          // ...metadata.distribution,

          // dataSet과 distribution의 title과 description이 겹치므로 분리해서 사용
          dataSetTitle: metadata.dataSet.title,
          dataSetDescription: metadata.dataSet.description,
          distributionTitle: metadata.distribution.title,
          distributionDescription: metadata.distribution.description,
          downloadUrl: metadata.distribution.downloadUrl,
        };
      });
    }

    setRows(parseToRows(data));
  }, [data]);

  useEffect(() => {
    // downloadUrl 처리
    if (selectedRowId) {
      const selectedRow = rows.find((row) => row.id === selectedRowId);
      setDownloadUrl(selectedRow.downloadUrl);
      // 서버로 downloadUrl 보내기
    } else {
      setDownloadUrl(null);
    }
  }, [selectedRowId, rows]);

  useEffect(() => {
    // downloadUrl이 변경될 때마다 downloadUrl 값을 props로 전달합니다.
    if (props.setDownloadUrl) {
      props.setDownloadUrl(downloadUrl);
    }
  }, [downloadUrl, props]);

  useEffect(() => {
    // rows가 업데이트되면 DataGrid를 다시 렌더링합니다.
    if (rows.length > 0) {
      console.log(rows);
    }
  }, [rows]);

  // rows가 비어있는 경우를 처리
  if (!rows || rows.length === 0) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
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
          if (newSelection && newSelection.length > 0) {
            props.setSelectedRow(true);
          } else {
            props.setSelectedRow(false);
          }
          setSelectedRowId(newSelection[0]);
        }}
        hideFooter
        headerHeight={45}
      />
    </Box>
  );
};

export default DataInputGrid;
