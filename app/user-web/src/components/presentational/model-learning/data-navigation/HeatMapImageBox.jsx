import React from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const HeatMapImageBox = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <CardMedia
        component='img'
        image={props.imageUrl}
        alt='heatmap image'
        sx={{
          width: "50%",
        }}
      />
    </Box>
  );
};

export default HeatMapImageBox;
