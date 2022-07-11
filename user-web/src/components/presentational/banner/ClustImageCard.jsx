import React from "react";

import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ClustImageCard() {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/empty.png"
          alt="CLUST IMAGE"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            CLUST(CLUStering Technogies of fragmented data for time-based data analysis
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
