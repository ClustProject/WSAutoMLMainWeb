import React, {useEffect, useState} from "react";
import getFeatureSelectionContent from "../../../../api/get-feature-selection-content";
import {Typography} from "@mui/material";
import FeatureSelectionContentTable from "./FeatureSelectionContentTable";
import Box from "@mui/material/Box";

const FeatureSelectionContent = (props) => {
  const {setAnyTargetVariableUsed} = props;

  const [content, setContent] = useState({
    "removed_missing_value_count": 0,
    "scale_type": "standard",
    "data": []
  });

  useEffect(() => {
    getFeatureSelectionContent()
      .then(_content => setContent(_content));
  }, []);

  return (
    <Box>
      <Typography variant="h5" align="right" sx={{
        marginBottom: '10px'
      }}>
        데이터 정제
        ( 제거된 결측치 : {content.removed_missing_value_count},
        {content.scale_type} scale
        )
      </Typography>

      <FeatureSelectionContentTable
        data={content.data}
        setAnyTargetVariableUsed={setAnyTargetVariableUsed}
      />

    </Box>
  )
}


export default FeatureSelectionContent;
