import React from "react";

import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function IntroduceCommentBox() {
  return (
    <Box
      sx={{
        color: "white",
      }}
    >
      <Typography variant='h4'>Welcome to WS-AutoML</Typography>
      <Divider
        sx={{
          my: "10px",
          border: 1,
          borderColor: "white",
        }}
      />
      <Typography variant='h5'>
        WS-AutoML 플랫폼은 파편화된 다양한 원천 데이터의 활용을 위한
      </Typography>
      <Typography variant='h5'>
        통합 데이터 관리 플랫폼으로서 공공기관과 CLUST Consortium에서
      </Typography>
      <Typography variant='h5'>
        구축된 데이터를 활용한 분석 서비스를 제공합니다.
        {/* 구축된 데이터를 활용한 분석 및 시각화 서비스를 제공한다. */}
      </Typography>
    </Box>
  );
}
