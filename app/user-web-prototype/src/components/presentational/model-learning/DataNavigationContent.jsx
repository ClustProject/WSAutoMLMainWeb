import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import DataNavigationContentTable from "./DataNavigationContentTable";
import getNavigationContent from "../../../api/get-navigation-content";

/**
 * 데이터 탐색 콘텐츠
 */
function DataNavigationContent() {
  const [content, setContent] = useState({
    count: 0,
    missing_count: 0,
    data: []
  });

  useEffect(() => {
    getNavigationContent()
      .then(_content => setContent(_content));
  }, []);

  return (
    <Box>
      <Typography variant="h5" align="right" sx={{
        marginBottom: '10px'
      }}>
        데이터셋 정보(데이터 개수 : {content.count}, 결측치 : {content.missing_count})
      </Typography>

      <DataNavigationContentTable
        data={content.data}
      />
    </Box>
  )
}

export default DataNavigationContent;
