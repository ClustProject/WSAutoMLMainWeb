import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import {
  StyledTable,
  StyledTableCell,
  StyledTableHeaderCell,
} from "../../StyledTableComponents";
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Box,
} from "@mui/material";
import jschardet from "jschardet";
import CircularProgress from "@mui/material/CircularProgress";

const ModelPreviewBox = (props) => {
  const { selectedRowData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetColumns, setTargetColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(selectedRowData.downloadUrl, {
          responseType: "blob",
        });
        const file = new File([response.data], "temp.csv", {
          type: "text/csv",
        });

        const useColumns = Object.entries(selectedRowData.varUseYnJSON)
          .filter(([, value]) => value === "Y")
          .map(([key]) => selectedRowData.varNmJSON[key]);

        const calculatedTargetColumns = Object.entries(
          selectedRowData.varTgYnJSON
        )
          .filter(([, value]) => value === "Y")
          .map(([key]) => selectedRowData.varNmJSON[key]);

        setTargetColumns(calculatedTargetColumns);

        const reorderedUseColumns = [
          ...calculatedTargetColumns,
          ...useColumns.filter((col) => !calculatedTargetColumns.includes(col)),
        ];

        const reader = new FileReader();
        reader.onload = function (event) {
          const detectedEncoding = jschardet.detect(
            event.target.result
          ).encoding;

          Papa.parse(file, {
            complete: (result) => {
              const filteredData = result.data.map((row) =>
                Object.fromEntries(
                  reorderedUseColumns.map((column) => [column, row[column]])
                )
              );
              setData(filteredData);
              setLoading(false);
            },
            header: true,
            encoding: detectedEncoding,
          });
        };
        reader.readAsBinaryString(file);
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };

    fetchData();
  }, [selectedRowData]);

  return (
    <>
      <TableContainer
        sx={{
          border: "1px solid lightgray",
          overflow: "scroll",
          position: "relative",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <StyledTable>
            <TableHead>
              <TableRow>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key, index) => (
                    <StyledTableHeaderCell
                      key={index}
                      style={
                        targetColumns.includes(key) ? { color: "blue" } : {}
                      }
                    >
                      {key}
                    </StyledTableHeaderCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 6).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.values(row).map((value, valueIndex) => (
                    <StyledTableCell key={valueIndex}>{value}</StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        )}
      </TableContainer>
    </>
  );
};

export default ModelPreviewBox;
