import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@mui/material";
import React from "react";

function FileDataDetailCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" sx={{
          fontWeight: 'bold'
        }}>
          종관기상관측(ASOS)
        </Typography>
        <Typography variant="body2">
          기상강원지방기상청 춘천기상대에서 측정한 데이터로 철원지점 해발고도 155m 지점에서 측정된 자료
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FileDataDetailCard;
