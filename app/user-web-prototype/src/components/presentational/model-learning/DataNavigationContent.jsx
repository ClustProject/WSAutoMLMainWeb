import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import DataNavigationContentTable from "./DataNavigationContentTable";
import getNavigationContent from "../../../api/get-navigation-content";
import CardMedia from "@mui/material/CardMedia";

const HeatMapImageBox = (props: { imageUrl: string }) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      marginTop: "40px"
    }}>
      <CardMedia
        component="img"
        image={props.imageUrl}
        alt="heatmap image"
        sx={{
          width: "50%"
        }}
      />
    </Box>
  );
}

/**
 * 데이터 탐색 콘텐츠
 */
const DataNavigationContent = (props) => {
  const {setAnyTargetVariableChecked} = props;

  const [content, setContent] = useState({
    count: 0,
    missing_count: 0,
    data: [],
    heatmap_image_url: ""
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
        setAnyTargetVariableChecked={setAnyTargetVariableChecked}
      />

      <HeatMapImageBox
        imageUrl={content.heatmap_image_url}
      />
    </Box>
  )
}

export default DataNavigationContent;
