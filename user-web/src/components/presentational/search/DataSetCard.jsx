import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Link, Typography} from "@mui/material";

export default function DataSetCard(props) {
  return (
    <Card sx={{
      my: 2
    }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link href="#">
            {props.name}
          </Link>
        </Typography>
        <Typography variant="body2">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
