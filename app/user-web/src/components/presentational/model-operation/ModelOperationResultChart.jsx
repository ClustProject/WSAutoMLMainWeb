import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const ModelOperationResultChart = () => {
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardMedia
        component='img'
        image='/static/images/modelResult.png'
        alt='RESULT IMAGE'
      />
    </Card>
  );
};

export default ModelOperationResultChart;
