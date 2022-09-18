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
          <Link href={`/metadata/${props.id}`}>
            {props.name}
          </Link>
        </Typography>
        <Typography variant="body2" display="inline" sx={{
          fontWeight: 'bold'
        }}>
          제목&nbsp;
        </Typography>
        <Typography variant="body2" display="inline">
          {props.title}
        </Typography>
        <br/>
        <Typography variant="body2" display="inline" sx={{
          fontWeight: 'bold'
        }}>
          설명&nbsp;
        </Typography>
        <Typography variant="body2" display="inline">
          {props.description}
        </Typography>

        <br/>
        <Typography variant="body2" display="inline" sx={{
          fontWeight: 'bold'
        }}>
          키워드&nbsp;
        </Typography>
        <Typography variant="body2" display="inline">
          {props.keyword}
        </Typography>
      </CardContent>
    </Card>
  );
}
