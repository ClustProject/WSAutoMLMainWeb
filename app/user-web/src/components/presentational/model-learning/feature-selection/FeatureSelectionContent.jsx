import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FeatureSelectionContentTable from "./FeatureSelectionContentTable";
import Box from "@mui/material/Box";
import FeatureImportanceChartBox from "./FeatureImportanceChartBox";
import CircularProgress from "@mui/material/CircularProgress";

const FeatureSelectionContent = (props) => {
  const { payload, setPayload, setAnyTargetVariableUsed } = props;
  const [data, setData] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  useEffect(() => {
    // console.log("sending data:", payload);

    fetch("http://52.79.123.200:8797/v1/feature_importance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Received data:", data);
        setData(data);
      })
      .catch((error) => console.error("Error occurred:", error));
  }, []);

  if (!data) {
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
        데이터 정제 ( 제거된 결측치 :
        {data ? data.removed_missing_value_count : null},
        {data ? data.scale_type : null} scale )
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FeatureImportanceChartBox
          data={data}
          selectedFeatures={selectedFeatures}
        />
        <FeatureSelectionContentTable
          json={data}
          setAnyTargetVariableUsed={setAnyTargetVariableUsed}
          payload={payload}
          setPayload={setPayload}
          setSelectedFeatures={setSelectedFeatures}
        />
      </div>
    </Box>
  );
};

export default FeatureSelectionContent;
