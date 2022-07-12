import React from "react";

import {Box, CardActionArea} from "@mui/material";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const cardInfo = [
  {
    name: "검색",
    image: "/static/images/cards/search.jpg"
  },
  {
    name: "모델 학습(예정)",
    image: "/static/images/cards/ai.jpeg"
  },
  {
    name: "시각화(예정)",
    image: "/static/images/cards/visualization.png"
  }
]

export default function ContentMediaCards() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: "center"
    }}>
      <Box sx={{
        width: "65%",
        height: "300px",
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {cardInfo.map(it =>
          <ContentMediaCard
            name={it.name}
            image={it.image}
          />
        )}
      </Box></Box>
  );
}

function ContentMediaCard(props) {
  return (
    <Card sx={{
      width: '29%'
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.image}
          alt={props.name}
          sx={{
            height: "230px"
          }}
        />
        <CardContent>
          <Typography variant="h5" sx={{
            textAlign: "center"
          }}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

